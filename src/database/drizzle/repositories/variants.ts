"use server";
import { db } from "@/database";
import { eq, sql } from "drizzle-orm";
import { variants } from "@/database/drizzle/schema/variants";
import { getGalleryCollectionForVariants } from "./galleries";
import { properties } from "../schema/properties";

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
export const getOneVariant = async (id: number | string) => {
    try {
        const request = db
            .select()
            .from(variants)
            .where(eq(variants.id, sql.placeholder("id")))
            .prepare();
        const result = await request.execute({ id });
        return result[0];
    } catch (error) {
        return null;
    }
};

/**
 * Retourne les variants d'une propriété à partir de l'id de l'entité property
 */
export const getVariantsProperty = async (id: number | string) => {
    const request = db
        .select({ id: variants.id, name: variants.name })
        .from(variants)
        .leftJoin(properties, eq(variants.propertyID, properties.id))
        .where(eq(properties.id, sql.placeholder("id")))
        .prepare();
    const result = await request.execute({ id });
    return result;
};

export const getOneVariantWithGallery = async (id: number | string) => {
    const request = db
        .select({ id: variants.id, name: variants.name })
        .from(variants)
        .where(eq(variants.id, sql.placeholder("id")))
        .prepare();
    const result = await request.execute({ id });

    const gallery = await getGalleryCollectionForVariants(id);

    return { ...result[0], gallery };
};

export const updateVariant = async (id: number | string, data: any) => {
    const findVariant = await getOneVariant(id);

    if (findVariant) {
        const request = db
            .update(variants)
            .set({
                ...findVariant,
                ...data,
            })
            .where(eq(variants.id, sql.placeholder("id")))
            .prepare();

        await request.execute({ id: findVariant.id });
        return await getOneVariant(findVariant.id);
    } else {
        if (!data.propertyID) throw new Error("propertyID missing!");
        const newVariant = await insertVariant(data.name, data.propertyID);
        return await getOneVariant(newVariant.id);
    }
};

export const deleteVariant = async (ids: Array<number>) => {
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
};
