"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";
import { variants } from "@/database/drizzle/schema/variants";
import { and, AnyColumn, asc, count, desc, eq, ilike, like, or, sql } from "drizzle-orm";
import { createPropertyDto, updatePropertyDto } from "./dto/propertiesDTO";
import { categoryProperties } from "../schema/categoryProperties";
import { clearGalleryFromVariantID, getFirstPictureFromGallery, getGalleryCollectionForVariants } from "./galleries";
import { getVariantsProperty, removeVariantsWithGallery } from "./variants";
import { FilterPaginationType, OrderType } from "@/database/types";
import { withPagination } from "./utils/entity";
import { MySqlColumn, MySqlTableWithColumns } from "drizzle-orm/mysql-core";

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

        const newProperty = await db
            .select()
            .from(properties)
            .where(sql<string>`id=${id}`);
        return newProperty[0];
    } catch (error: any) {
        throw error;
    }
};

export const getPropertiesCollections = async (filter: FilterPaginationType) => {
    const { page, order, limit, search } = filter;
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
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID));

    const columnToOrder = "createdAt";
    const orderby = order === "asc" ? asc(properties[columnToOrder]) : desc(properties[columnToOrder]);

    const rowsCount = await db.select({ count: count() }).from(properties);
    const totalItems = rowsCount[0].count;
    const queryWithCondition = search
        ? query
              .$dynamic()
              .where(
                  or(
                      like(properties.name, sql.placeholder("search")),
                      like(categoryProperties.name, sql.placeholder("search")),
                  ),
              )
        : query.$dynamic();
    const parameters = {
        search: `%${search}%`,
    };
    const data = await withPagination(queryWithCondition, orderby, page, limit, parameters);

    return {
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
        .where(eq(properties.id, sql.placeholder("id")))
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
        })
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await request.execute({
        id,
    });

    const propertyUpdated = await getOnePropertyByID(id);

    return propertyUpdated;
};

export const deleteProperty = async (id: number | string) => {
    const property = await getOnePropertyByID(id);
    if (!property) throw new Error("property not found");
    const request = db
        .delete(properties)
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    await request.execute({
        id,
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
            if (!property) throw new Error("property not found");
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
    type?: string | null;
};
/**
 * Récupérations des bien immobilier et ses variantes  index utiliser  dans cette requête et l'id de la variantes
 *
 * **Attention:**  l'id variant est utilisé en tant que id unique
 */
export const getPropertiesWithVariantsCollections = async ({ type }: getPropertiesWithVariantsArgs) => {
    const result = db
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
    if (type !== "all" && type) {
        result.where(sql<string>`${categoryProperties.name}=${type}`);
    }
    return await result;
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
        .leftJoin(properties, eq(properties.id, variants.propertyID));

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

    result.where(and(searchCondition, categoryCondition, isAvailableCondition));

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
        const photo = await getFirstPictureFromGallery(property.id);
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
        .where(eq(variants.id, sql.placeholder("variantID")))
        .prepare();
    return request.execute({
        variantID,
    });
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
