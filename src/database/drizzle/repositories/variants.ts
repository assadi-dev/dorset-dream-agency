"use server";
import { db } from "@/database";
import { and, eq, isNotNull, isNull, sql } from "drizzle-orm";
import { variants } from "@/database/drizzle/schema/variants";
import { getGalleryCollectionForVariants } from "./galleries";
import { properties } from "../schema/properties";
import { generateDescription, selectWithSoftDelete, sendToUserActions, setDeletedAt } from "./utils/entity";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { getOnePropertyByID, getOnePropertyByIDNoSoftDelete, restoreProperty } from "./properties";

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(variants);
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

        const newVariants = await getOneVariant(result[0].insertId);
        const messageDescription = newVariants ? `Ajout de la variante  ${newVariants.name}` : `Ajout d'une variante`;

        const description = await generateDescription(messageDescription);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "create",
                name: ACTION_NAMES.variants.create,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.VARIANTS,
            });
        }

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
            .where(and(softDeleteCondition, eq(variants.id, sql.placeholder("id"))))
            .prepare();
        const result = await request.execute({ id });
        return result[0];
    } catch (error) {
        return null;
    }
};

export const getOneByName = async (name: string) => {
    try {
        const request = await db.select().from(variants).where(eq(variants.name, name));
        return request[0];
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
        .where(and(softDeleteCondition, eq(properties.id, sql.placeholder("id"))))
        .prepare();
    const result = await request.execute({ id });
    return result;
};

/**
 * Retourne les variants d'une propriété à partir de l'id de l'entité property
 */
export const getVariantsPropertyNoSoftDelete = async (id: number | string) => {
    const request = db
        .select({ id: variants.id, name: variants.name })
        .from(variants)
        .leftJoin(properties, eq(variants.propertyID, properties.id))
        .where(and(eq(properties.id, sql.placeholder("id"))))
        .prepare();
    const result = await request.execute({ id });
    return result;
};

export const getOneVariantWithGallery = async (id: number | string) => {
    const request = db
        .select({ id: variants.id, name: variants.name })
        .from(variants)
        .where(and(softDeleteCondition, eq(variants.id, sql.placeholder("id"))))
        .prepare();
    const result = await request.execute({ id });

    const files = await getGalleryCollectionForVariants(id);

    return { ...result[0], files };
};

export const updateVariant = async (id: number | string, data: any) => {
    const findVariant = await getOneVariant(id);
    if (findVariant) {
        data.name = data.name || findVariant?.name;
        const request = db
            .update(variants)
            .set({
                ...findVariant,
                ...data,
            })
            .where(eq(variants.id, sql.placeholder("id")))
            .prepare();

        await request.execute({ id: findVariant.id });

        const messageDescription = findVariant
            ? `Modification de la variante  ${findVariant.name}`
            : `Modification d'une variante`;

        const description = await generateDescription(messageDescription);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "update",
                name: ACTION_NAMES.variants.update,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.VARIANTS,
            });
        }
        return await getOneVariant(id);
    } else {
        if (!data.propertyID) throw new Error("propertyID missing!");
        const newVariant = await insertVariant(data.name, data.propertyID);
        return await getOneVariant(newVariant.id);
    }
};

export const deleteVariant = async (id: number) => {
    const findVariant = await getOneVariant(id);
    /* const prepare = db
                .delete(variants)
                .where(eq(variants.id, sql.placeholder("id")))
                .prepare();
            await prepare.execute({
                id: id,
            }); */

    const prepare = setDeletedAt(variants)
        ?.where(eq(variants.id, sql.placeholder("id")))
        .prepare();
    await prepare?.execute({
        id: id,
    });

    let complement = "";
    const message =
        findVariant && findVariant.name
            ? `Suppression de la variante  ${findVariant.name}`
            : `Suppression d'une variante`;
    const property = findVariant?.propertyID && (await getOnePropertyByIDNoSoftDelete(findVariant?.propertyID));
    if (property) complement = ` de la propriété ${property.name}`;

    const extras = { id: findVariant?.id };

    await sendToUserActions({
        message: message + complement + ".",
        action: "delete",
        actionName: ACTION_NAMES.variants.delete,
        entity: ENTITIES_ENUM.VARIANTS,
        extras,
    });
};

/**
 * Suppression multiples des variantes avec gallery
 * @param ids
 */
export const removeVariantsWithGallery = async (ids: Array<number>) => {
    if (ids.length) {
        for (const id of ids) {
            // await clearGalleryFromVariantID(id);
            await deleteVariant(id);
        }
    }
};

export const restoreVariant = async (id: number) => {
    const prepare = db
        .update(variants)
        .set({ deletedAt: null })
        .where(eq(variants.id, sql.placeholder("id")));
    await prepare.execute({ id });
    const variant = await getOneVariant(id);
    let complement = "";
    const message =
        variant && variant.name ? `Restauration de la variante  ${variant.name}` : `Restauration d'une variante`;
    const property = variant?.propertyID && (await getOnePropertyByIDNoSoftDelete(variant?.propertyID));
    if (property) complement = ` de la propriété ${property.name}`;

    await sendToUserActions({
        message: message + complement + ".",
        action: "restore",
        actionName: ACTION_NAMES.variants.restore,
        entity: ENTITIES_ENUM.VARIANTS,
    });
};

export const restoreVariants = async (ids: number[]) => {
    if (ids.length) {
        for (const id of ids) {
            await shouldRestoreProperty(id);
            await restoreVariant(id);
        }
    }
};

export const shouldRestoreProperty = async (id: number) => {
    const variant = await getOneVariant(id);
    if (variant?.propertyID) {
        const property = await getOnePropertyByIDNoSoftDelete(variant.propertyID);
        if (property && property.deletedAt) {
            const query = db
                .update(properties)
                .set({ deletedAt: null })
                .where(and(eq(properties.id, sql.placeholder("id")), isNotNull(properties.deletedAt)));
            await query.execute({ id: property.id });
        }
    }
};
