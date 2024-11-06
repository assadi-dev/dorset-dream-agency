"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";
import { variants } from "@/database/drizzle/schema/variants";
import { and, asc, desc, eq, ilike, like, or, sql } from "drizzle-orm";
import { createPropertyDto } from "./dto/propertiesDTO";
import { categoryProperties } from "../schema/categoryProperties";
import { getFirstPictureFromGallery, getGalleryCollectionForVariants } from "./galleries";

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

export const getPropertiesCollections = async () => {
    const result = db.select().from(properties);
    return await result;
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
    const result = await request.execute({
        id,
    });
    return result[0];
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
    order?: "desc" | "asc";
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
