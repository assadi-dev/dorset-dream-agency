"use server";
import { db } from "@/database";
import { sql } from "drizzle-orm";
import { variants } from "@/database/drizzle/schema/variants";

export const insertVariant = async (name: string, propertyID: number) => {
    try {
        const prepare = db
            .insert(variants)
            .values({
                name: sql.placeholder("name"),
                propertyID: sql.placeholder("propertyID"),
            })
            .prepare();

        const result = await prepare.execute({
            name: name,
            propertyID,
        });

        return { id: result[0].insertId };
    } catch (error: any) {
        throw error;
    }
};

export const getVariantsCollections = async () => {
    return await db.select().from(variants);
};
