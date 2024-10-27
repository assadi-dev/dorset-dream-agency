"use server";
import { db } from "@/database";
import { eq, sql } from "drizzle-orm";
import { variants } from "@/database/drizzle/schema/variants";

export const insertVariant = async (name?: string | null, propertyID?: number | null) => {
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

export const deleteVariant = async (ids: Array<number>) => {
    try {
        if (ids.length) {
            for (const id of ids) {
                const prepare = db
                    .delete(variants)
                    .where(eq(variants.id, sql.placeholder("id")))
                    .prepare();
                await prepare.execute({
                    id: id,
                });
            }
        }
    } catch (error) {}
};
