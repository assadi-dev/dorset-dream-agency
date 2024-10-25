"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";
import { variants } from "@/database/drizzle/schema/variants";
import { eq, sql } from "drizzle-orm";
import { createPropertyDto } from "./dto/propertiesDTO";
import { categoryProperties } from "../schema/categoryProperties";

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

type getPropertiesWithVariantsArgs = {
    type?: string | null;
};
/**
 * Récupérations des bien immobilier et ses variantes  index utiliser  dans cette requête et l'id de la variantes
 */
export const getPropertiesWithVariantsCollections = async ({ type }: getPropertiesWithVariantsArgs) => {
    const result = db
        .select({
            id: variants.id,
            name: sql<string>`CONCAT(${properties.name}, " - " ,${variants.name})`,
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

export const getPropertiesWithVariantsOptions = async () => {
    const result = db
        .select({
            id: variants.id,
            name: sql<string>`CONCAT(${properties.name}, " - " ,${variants.name})`,
            label: sql<string>`CONCAT(${properties.name}, " - " ,${variants.name})`,
            value: variants.id,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID));

    return await result;
};
