"use server";
import { db } from "@/database";
import { ENV } from "@/config/global";
import { galleryVariants } from "@/database/drizzle/schema/galleryVariant";
import { insertVariant, updateVariant } from "./variants";
import { variants } from "../schema/variants";
import { asc, eq, sql } from "drizzle-orm";
import { photos } from "../schema/photos";
import { removePhotosByAndFile } from "./photos";

export const insertGallery = (variantID: number, photoID: number) => {
    try {
        return db.insert(galleryVariants).values({
            variantID,
            photoID,
        });
    } catch (error: any) {
        throw error;
    }
};

export const createVariantGallery = async (formData: FormData) => {
    try {
        const propertyID = Number(formData.get("propertyID"));
        const name = (formData.get("name") as string) || null;
        const files = formData.getAll("files");
        if (!files) return;

        const response = await uploadPhotoProperty(formData);

        const variant = await insertVariant(name, propertyID);

        for (const photo of response.photos) {
            const variantID = variant.id;
            const photoID = photo;
            await insertGallery(variantID, photoID);
        }
    } catch (error: any) {
        throw error;
    }
};

export const updateVariantGallery = async (formData: FormData) => {
    try {
        const variantID = Number(formData.get("variantID"));
        const propertyID = Number(formData.get("propertyID"));
        const name = (formData.get("name") as string) || null;
        const files = formData.getAll("files");

        const variant = await updateVariant(variantID, { name, propertyID });
        if (files.length > 0) {
            const response = await uploadPhotoProperty(formData);
            for (const photo of response.photos) {
                const photoID = photo;
                if (variant) await insertGallery(variant.id, photoID);
            }
        }

        return variant;
    } catch (error: any) {
        throw error;
    }
};

export const uploadPhotoProperty = async (formData: FormData): Promise<{ message: string; photos: Array<number> }> => {
    try {
        const response = await fetch(ENV.DOMAIN + "/api/uploads/photos/properties", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error occurred:", error.message || error);
        throw error;
    }
};

type GetFirstPictureFromGalleryArgs = {
    variantID: number;
};
/**
 *
 * Retourne la premiere photo associer à la variant passer en argument trier par ordre ascendant par le nom du fichier
 *
 */
export const getFirstPictureFromGallery = async (variantID: number) => {
    const req = db
        .select({
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .orderBy(asc(photos.originalName))
        .where(eq(variants.id, sql.placeholder("variantID")))
        .limit(1)
        .prepare();

    const result = await req.execute({
        variantID,
    });
    return result[0];
};

/**
 *
 * Retourne la collection des photos associer à la variant en passant l id de la variant en argument.
 * Résultat trier par ordre ascendant par le nom du fichier
 *
 */
export const getGalleryCollectionForVariants = async (variantID: number | string) => {
    const req = db
        .select({
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .where(eq(variants.id, sql.placeholder("variantID")))
        .orderBy(asc(photos.originalName))
        .prepare();

    return await req.execute({
        variantID,
    });
};

/**
 *
 * Nettoyage de la table galleryVariants + suppression des fichiers uploadé
 * @param id id de la variante
 */
export const clearGalleryFromVariantID = async (id: number) => {
    const galleries = await getGalleryCollectionForVariants(id);
    const photosIDs = galleries.map((photo) => photo.id);
    await removePhotosByAndFile(photosIDs, "properties");
};
