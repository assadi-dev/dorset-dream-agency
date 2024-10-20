"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";
import { variants } from "@/database/drizzle/schema/variants";
import { eq, sql } from "drizzle-orm";

export const getPropertiesCollections = async () => {
    const result = db.select().from(properties);
    return await result;
};

export const getPropertiesWithVariantsCollections = async () => {
    const result = db
        .select({
            id: variants.id,
            name: sql<string>`CONCAT(${properties.name}, " - " ,${variants.name})`,
            rentalPrice: properties.rentalPrice,
            sellingPrice: properties.sellingPrice,
            isAvailable: properties.isAvailable,
            isFurnish: properties.isFurnish,
        })
        .from(variants)
        .leftJoin(properties, eq(properties.id, variants.propertyID));
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
