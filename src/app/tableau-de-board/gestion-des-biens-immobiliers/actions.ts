"use server";

import { db } from "@/database";
import { properties } from "@/database/drizzle/schema/properties";

export const getPropertiesCollections = async () => {
    const result = db.select().from(properties);
    return await result;
};
