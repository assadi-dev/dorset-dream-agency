"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";
import { variants } from "@/database/drizzle/schema/variants";
import { and, asc, count, desc, eq, like, or, sql } from "drizzle-orm";
import { createPropertyDto } from "./dto/propertiesDTO";
import { categoryProperties } from "../schema/categoryProperties";
import { getCoverPictureFromGallery, getGalleryCollectionForVariants } from "./galleries";
import {
    getVariantsProperty,
    getVariantsPropertyNoSoftDelete,
    removeVariantsWithGallery,
    restoreVariants,
} from "./variants";
import { FilterPaginationType, OrderType } from "@/database/types";
import {
    generateDescription,
    selectWithSoftDelete,
    sendToUserActions,
    setDeletedAt,
    withPagination,
} from "./utils/entity";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { clients } from "../schema/client";

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(properties);
const variantSoftDeleteCondition = selectWithSoftDelete(variants);

export const insertProperty = async (values: any) => {
    try {
        const validateInput = await createPropertyDto(values);

        if (validateInput.error) throw validateInput.error;

        const result = await db
            .insert(properties)
            .values({
                ...validateInput.data,
                categoryID: values.categoryProperty,
            })
            .$returningId();
        const id: number = result[0].id;

        const newProperty = await getOnePropertyByID(id);

        const description = await generateDescription(`Création du bien immobilier ${newProperty.name}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "create",
                name: ACTION_NAMES.properties.create,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.PROPERTIES,
            });
        }

        return newProperty;
    } catch (error: any) {
        throw error;
    }
};

export const getPropertiesCollections = async (filter: FilterPaginationType) => {
    const { page, order, limit, search } = filter;
    const searchCondition = search
        ? or(
              like(properties.name, sql.placeholder("search")),
              like(properties.address, sql.placeholder("search")),
              like(categoryProperties.name, sql.placeholder("search")),
          )
        : undefined;

    const query = db
        .select({
            id: properties.id,
            name: properties.name,
            categoryID: properties.categoryID,
            category: categoryProperties.name,
            sellingPrice: properties.sellingPrice,
            rentalPrice: properties.rentalPrice,
            stock: properties.stock,
            isFurnish: properties.isFurnish,
            isAvailable: properties.isAvailable,
            createdAt: properties.createdAt,
        })
        .from(properties)
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
        .where(and(softDeleteCondition, searchCondition));

    const columnToOrder = "createdAt";
    const orderby = order === "asc" ? asc(properties[columnToOrder]) : desc(properties[columnToOrder]);

    const parameters: Record<string, string> | undefined = {
        search: `%${search}%`,
    };

    const rowsCount = await query.execute({
        ...parameters,
    });

    const totalItems = rowsCount.length || 0;

    const data = await withPagination(query.$dynamic(), orderby, page, limit, parameters);

    return {
        page,
        totalItems,
        limit,
        order,
        data,
    };
};
export const getOnePropertyByID = async (id: number | string) => {
    const request = db
        .select()
        .from(properties)
        .where(and(softDeleteCondition, eq(properties.id, sql.placeholder("id"))))
        .prepare();
    const result = await request.execute({
        id,
    });
    return result[0];
};

export const getOnePropertyByIDNoSoftDelete = async (id: number | string) => {
    const request = db
        .select()
        .from(properties)
        .where(and(eq(properties.id, sql.placeholder("id"))))
        .prepare();
    const result = await request.execute({
        id,
    });
    return result[0];
};
export const getOnePropertyWithVariant = async (id: number | string) => {
    const request = db
        .select({
            id: properties.id,
            name: properties.name,
            resume: properties.resume,
            description: properties.description,
            address: properties.address,
            categoryID: properties.categoryID,
            category: categoryProperties.name,
            sellingPrice: properties.sellingPrice,
            rentalPrice: properties.rentalPrice,
            stock: properties.stock,
            isFurnish: properties.isFurnish,
            isAvailable: properties.isAvailable,
            createdAt: properties.createdAt,
        })
        .from(properties)
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
        .groupBy(properties.id)
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();

    const result = await request.execute({
        id,
    });

    const propertyResult = await propertyParser(result[0]);
    const retrieveVariants = await getVariantsProperty(id);

    const propertyFinalResult = { ...propertyResult, variants: retrieveVariants };

    return propertyFinalResult;
};

export const updateProperty = async (id: number | string, data: any) => {
    const property = await getOnePropertyByID(id);
    const request = db
        .update(properties)
        .set({
            ...property,
            ...data,
            categoryID: data.categoryProperty,
        })
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await request.execute({
        id,
    });

    const propertyUpdated = await getOnePropertyByID(id);

    const description = await generateDescription(`Modification du bien immobilier ${propertyUpdated.name}`);
    if (description) {
        await insertUserAction({
            user: description.user as string,
            action: "update",
            name: ACTION_NAMES.properties.update,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.PROPERTIES,
        });
    }

    return propertyUpdated;
};

export const deleteProperty = async (id: number | string) => {
    const property = await getOnePropertyByID(id);
    if (!property) throw new Error("property not found");
    /*    const request = db
        .delete(properties)
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await request.execute({
        id,
    }); */

    const request = setDeletedAt(properties)
        ?.where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await request?.execute({
        id,
    });

    const extras = { id };
    await sendToUserActions({
        message: `Suppression du bien immobilier ${property.name}`,
        action: "delete",
        entity: ENTITIES_ENUM.PROPERTIES,
        actionName: ACTION_NAMES.properties.delete,
        extras,
    });
};

/**
 *
 * Suppression multiples des properties
 */
export const removeProperties = async (ids: number[] | string[]) => {
    if (ids && ids.length > 0) {
        for (const id of ids) {
            const property = await getOnePropertyByID(id);
            if (!property) continue;
            deleteProperty(id);
        }
    }
};

/**
 * Suppression d'un property suivie de ses variants
 * @param id id du property
 *
 **/
export const removeVariantOfProperties = async (ids: number[] | string[]) => {
    if (ids && ids.length > 0) {
        for (const id of ids) {
            const property = await getOnePropertyByID(id);
            if (!property) throw new Error("property not found");
            const variants = await getVariantsProperty(property.id);
            const variantsIDs = variants.map((v) => v.id);
            await removeVariantsWithGallery(variantsIDs);
        }
    }
};

/**
 * Suppression completes des properties + variants + files
 * @param ids listes d'id des properties
 */
export const removePropertyWithFiles = async (ids: number[] | string[]) => {
    if (ids && ids.length > 0) {
        await removeVariantOfProperties(ids);
        await removeProperties(ids);
    }
};

type getPropertiesWithVariantsArgs = {
    categoryName?: string | null;
};
/**
 * Récupérations des bien immobilier et ses variantes  index utiliser  dans cette requête et l'id de la variantes
 *
 * **Attention:**  l'id variant est utilisé en tant que id unique
 */
export const getPropertiesWithVariantsCollections = async (
    filter: FilterPaginationType & getPropertiesWithVariantsArgs,
) => {
    const { categoryName, search, page, limit, order } = filter;
    const searchCondition = search
        ? or(
              like(properties.name, sql.placeholder("search")),
              like(properties.address, sql.placeholder("search")),
              like(categoryProperties.name, sql.placeholder("search")),
          )
        : undefined;
    const categoryCondition = categoryName ? eq(categoryProperties.name, sql.placeholder("categoryName")) : undefined;

    const parameters: any = {
        search: `%${search}%`,
        categoryName: categoryName,
    };

    const query = db
        .select({
            id: variants.id,
            propertyID: properties.id,
            name: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            address: properties.address,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
            isAvailable: properties.isAvailable,
            isFurnish: properties.isFurnish,
            category: categoryProperties.name,
            createdAt: variants.createdAt,
            resume: properties.resume,
            stock: properties.stock,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID))
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
        .orderBy(sql`${variants.createdAt} desc`);
    if (categoryName !== "all" && categoryName) {
        query.where(and(variantSoftDeleteCondition, softDeleteCondition, searchCondition, categoryCondition));
    }
    const rowsCount = await query.execute({
        ...parameters,
    });

    const totalItems = rowsCount.length || 0;
    const columnToOrder = "createdAt";
    const orderby = order === "asc" ? asc(properties[columnToOrder]) : desc(properties[columnToOrder]);
    const data = await withPagination(query.$dynamic(), orderby, page, limit, parameters);
    return {
        page,
        totalItems,
        limit,
        order,
        data,
    };
};

/**
 * Récupérations des propriétés pour les liste sélectionnables
 *
 * **Attention:**  l'id variant est utilisé en tant que id unique
 *
 */
export const getPropertiesWithVariantsOptions = async () => {
    const result = db
        .select({
            id: variants.id,
            propertyID: properties.id,
            name: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            label: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            value: variants.id,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID))
        .where(and(softDeleteCondition, variantSoftDeleteCondition));

    return await result;
};

type getPropertyPresentationArgs = {
    limit?: number;
    category?: number | string | null;
    order?: OrderType;
    isAvailable?: boolean | null;
    search?: string | null;
};
/**
 * Récupérations des propriétés avec filtre pour catalogue
 *
 * **Attention:**  l'id variant est utilisé en tant que id unique
 *
 */
export const getPropertyCollections = async ({
    limit,
    category,
    order,
    isAvailable,
    search,
}: getPropertyPresentationArgs) => {
    const result = db
        .select({
            id: variants.id,
            propertyID: properties.id,
            name: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            label: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            description: properties.description,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
            isFurnish: properties.isFurnish,
            isAvailable: properties.isAvailable,
            category: categoryProperties.name,
            categoryID: sql<string>`${categoryProperties.id}`,
            resume: properties.resume,
            stock: properties.stock,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID))
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID));

    switch (order) {
        case "desc":
            result.orderBy(desc(properties.createdAt));
            break;
        case "asc":
            result.orderBy(asc(properties.createdAt));
            break;
    }

    if (limit) result.limit(limit);

    const searchCondition = search
        ? or(like(properties.name, sql.placeholder("search")), like(variants.name, sql.placeholder("search")))
        : undefined;

    const isAvailableCondition =
        isAvailable !== null && isAvailable !== undefined
            ? eq(properties.isAvailable, sql.placeholder("isAvailable"))
            : undefined;
    const categoryCondition =
        category && category !== "all"
            ? or(
                  eq(categoryProperties.id, sql.placeholder("category")),
                  eq(categoryProperties.name, sql.placeholder("category")),
              )
            : undefined;

    result.where(
        and(softDeleteCondition, variantSoftDeleteCondition, searchCondition, categoryCondition, isAvailableCondition),
    );

    result.prepare();

    return await result.execute({
        categoryID: category,
        category,
        isAvailable,
        search: `%${search}%`,
    });
};
/**
 * Récupérations des propriétés pour accompagné de l'image de couverture
 * **Attention:**  l'id variant est utilisé en tant que id unique
 */
export const getPropertiesWithCover = async ({
    limit,
    category,
    order,
    isAvailable,
    search,
}: getPropertyPresentationArgs) => {
    const properties = await getPropertyCollections({ limit, category, order, isAvailable, search });

    const propertiesWithCover = [];
    for (const property of properties) {
        const photo = await getCoverPictureFromGallery(property.id);

        const update = { ...property, photo: photo.url || null };
        propertiesWithCover.push(update);
    }
    return propertiesWithCover;
};

export const getOnePropertyByVariantID = async (variantID: number) => {
    const request = db
        .select({
            id: variants.id,
            propertyID: properties.id,
            name: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
            address: properties.address,
            description: properties.description,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
            isFurnish: properties.isFurnish,
            isAvailable: properties.isAvailable,
            category: categoryProperties.name,
            categoryID: sql<string>`${categoryProperties.id}`,
            stock: properties.stock,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID))
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
        .where(and(variantSoftDeleteCondition, softDeleteCondition, eq(variants.id, sql.placeholder("variantID"))))
        .prepare();
    return request.execute({
        variantID,
    });
};

export const setAvailableProperties = async (id: number, value: boolean) => {
    const property = await getOnePropertyByID(id);
    if (!property) throw new Error("Property no found");
    const message = `La propriété ${property.name} à été rendu ${value ? "disponible" : "non-disponible"}`;
    const req = db
        .update(properties)
        .set({ isAvailable: value })
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await req.execute({ id });
    sendToUserActions({
        message,
        action: "update",
        actionName: ACTION_NAMES.prestige.available,
        entity: ENTITIES_ENUM.PROPERTIES,
    });
    return await getOnePropertyByID(id);
};

/**
 *
 * Récupération d'une propriété avec sa gallery de photos à partir de sa variante
 *
 */

export const getPropertyDetailForCatalogueWithGallery = async (variantID: number) => {
    const property = await getOnePropertyByVariantID(variantID);
    const gallery = await getGalleryCollectionForVariants(Number(variantID));
    return { ...property[0], gallery };
};

type PropertyParser = {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    address: string;
    description: string;
    rentalPrice: number;
    sellingPrice: number;
    stock: number;
    isFurnish: boolean;
    isAvailable: boolean;
    createdAt: string;
};

export const propertyParser = async (property: any): Promise<PropertyParser> => {
    const propertyParser = {
        id: property.id,
        name: property.name,
        category: {
            id: property.categoryID,
            name: property.category,
        },
        address: property.address,
        description: property.description,
        rentalPrice: property.rentalPrice,
        sellingPrice: property.sellingPrice,
        stock: property.stock,
        isFurnish: property.isFurnish,
        isAvailable: property.isAvailable,
        createdAt: property.createdAt,
    };

    return propertyParser;
};

export const restoreProperty = async (id: number) => {
    const variantsOfProperty = await getVariantsPropertyNoSoftDelete(id);
    if (variantsOfProperty.length) {
        const variantIds = variantsOfProperty.map((v) => v.id);

        await restoreVariants(variantIds);
    }
    const query = db
        .update(properties)
        .set({ deletedAt: null })
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await query.execute({ id });
    const property = await getOnePropertyByID(id);
    const message = `Restauration du bien immobilier ${property.name}`;
    await sendToUserActions({
        message,
        action: "restore",
        actionName: ACTION_NAMES.properties.restore,
        entity: ENTITIES_ENUM.PROPERTIES,
    });
};

export const restoreProperties = async (ids: number[]) => {
    for (const id of ids) {
        await restoreProperty(id);
    }
};
