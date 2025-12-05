"use server";
import { db } from "@/database";
import { ENV } from "@/config/global";
import { galleryVariants } from "@/database/drizzle/schema/galleryVariant";
import { insertVariant, updateVariant } from "./variants";
import { variants } from "../schema/variants";
import { and, asc, eq, or, sql, inArray } from "drizzle-orm";
import { photos } from "../schema/photos";
import { removePhotosByAndFile } from "./photos";
import { PhotoInferType } from "@/app/types/photos";

export const insertGallery = (
    variantID: number,
    photoID: number,
    { isCover, order }: { isCover?: boolean; order?: number },
) => {
    try {
        return db.insert(galleryVariants).values({
            variantID,
            photoID,
            isCover: isCover || false,
            order: order || 0,
        });
    } catch (error: any) {
        throw error;
    }
};

export const updateGallery = async ({
    variantID,
    photoID,
    isCover,
    order,
}: {
    variantID: number;
    photoID: number;
    isCover?: boolean;
    order?: number;
}) => {
    try {
        const collectionQuery = db
            .update(galleryVariants)
            .set({ isCover: false })
            .where(and(eq(galleryVariants.variantID, sql.placeholder("variantID"))));
        await collectionQuery.execute({
            variantID,
        });

        const query = db
            .update(galleryVariants)
            .set({
                isCover: isCover || false,
                order: order || 0,
            })
            .where(
                and(
                    eq(galleryVariants.variantID, sql.placeholder("variantID")),
                    eq(galleryVariants.photoID, sql.placeholder("photoID")),
                ),
            )
            .prepare();

        await query.execute({
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
        const files = formData.getAll("files") as File[];
        const coverIndex = Number(formData.get("isCoverIndex")) || 0;
        const coverFile = files[coverIndex];

        if (!files) return;

        const response = await uploadPhotoProperty(formData);
        const variant = await insertVariant(name, propertyID);
        let order = 0;
        for (const photo of response.photos) {
            const variantID = variant.id;
            const photoID = photo.id;
            const isCover = coverFile.name.toLowerCase() == photo.originalName.toLowerCase();
            await insertGallery(variantID, photoID, { order, isCover });
            order++;
        }
    } catch (error: any) {
        throw error;
    }
};

export const extractIdsToRemove = async (formData: FormData): Promise<number[]> => {
    const cleanResult: number[] = [];
    try {
        const data = await formData.getAll("toRemove");
        if (!data) return [];
        const parseData = JSON.parse(String(data));

        for (const id of parseData) {
            try {
                const parseToNumber = Number(id);
                cleanResult.push(parseToNumber);
            } catch (error) {
                continue;
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
        }
    }
    return cleanResult;
};

export const updateVariantGallery = async (formData: FormData) => {
    try {
        const variantID = Number(formData.get("variantID"));
        const propertyID = Number(formData.get("propertyID"));
        const name = (formData.get("name") as string) || null;
        const files = formData.getAll("files") as File[];
        const coverIndex = Number(formData.get("isCoverIndex")) || 0;
        const coverFile = files[coverIndex];
        const photosToRemove = await extractIdsToRemove(formData);

        const variant = await updateVariant(variantID, { name, propertyID });

        if (photosToRemove.length > 0) {
            await removePhotosGalleryFromVariantID(variantID, photosToRemove);
        }

        let order = 0;
        if (files.length > 0) {
            const response = await uploadPhotoProperty(formData);
            for (const photo of response.photos) {
                const photoID = photo.id;
                const isCover = coverFile ? coverFile.name.toLowerCase() == photo.originalName.toLowerCase() : false;
                if (variant) await insertGallery(variant.id, photoID, { order, isCover });
                order++;
            }
        }

        return variant;
    } catch (error: any) {
        throw error;
    }
};

export const uploadPhotoProperty = async (
    formData: FormData,
): Promise<{ message: string; photos: Array<PhotoInferType> }> => {
    try {
        const response = await fetch(ENV.DOMAIN + "/api/uploads/photos/properties", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
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
            isCover: galleryVariants.isCover,
            order: galleryVariants.order,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .orderBy(asc(galleryVariants.order), asc(photos.originalName))
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
 * Retourne la premiere photo associer à la variant passer en argument trier par ordre ascendant par le nom du fichier
 *
 */
export const getCoverPictureFromGallery = async (variantID: number) => {
    const req = db
        .select({
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
            isCover: galleryVariants.isCover,
            order: galleryVariants.order,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .orderBy(asc(galleryVariants.order), asc(photos.originalName))
        .where(and(eq(variants.id, sql.placeholder("variantID")), eq(galleryVariants.isCover, true)))
        .limit(1)
        .prepare();

    const coverPhoto = await req.execute({
        variantID,
    });
    const result = coverPhoto.length ? coverPhoto[0] : await getFirstPictureFromGallery(variantID);
    return result;
};

/**
 *
 * Retourne les photos de couverture pour plusieurs variants en une seule requête
 * Optimisation pour éviter le N+1 query problem
 *
 */
export const getCoverPicturesForMultipleVariants = async (variantIDs: number[]) => {
    if (variantIDs.length === 0) return [];

    // Get all cover photos for the variant IDs
    const coverPhotos = await db
        .select({
            variantID: variants.id,
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
            isCover: galleryVariants.isCover,
            order: galleryVariants.order,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .where(and(inArray(variants.id, variantIDs), eq(galleryVariants.isCover, true)))
        .orderBy(asc(galleryVariants.order), asc(photos.originalName));

    // Get first photos for variants that don't have a cover photo
    const variantsWithCover = new Set(coverPhotos.map((photo) => photo.variantID));
    const variantsWithoutCover = variantIDs.filter((id) => !variantsWithCover.has(id));

    let firstPhotos: any[] = [];
    if (variantsWithoutCover.length > 0) {
        firstPhotos = await db
            .select({
                variantID: variants.id,
                id: photos.id,
                url: photos.url,
                originalName: photos.originalName,
                size: photos.size,
                type: photos.mimeType,
                isCover: galleryVariants.isCover,
                order: galleryVariants.order,
            })
            .from(galleryVariants)
            .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
            .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
            .where(inArray(variants.id, variantsWithoutCover))
            .orderBy(asc(galleryVariants.order), asc(photos.originalName));
    }

    // Combine results and create a map of variantID to photo
    const photoMap = new Map<number, any>();

    // Add cover photos first (they take priority)
    coverPhotos.forEach((photo) => {
        if (!photoMap.has(photo.variantID)) {
            photoMap.set(photo.variantID, photo);
        }
    });

    // Add first photos for variants without covers
    firstPhotos.forEach((photo) => {
        if (!photoMap.has(photo.variantID)) {
            photoMap.set(photo.variantID, photo);
        }
    });

    return photoMap;
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
            isCover: galleryVariants.isCover,
            order: galleryVariants.order,
        })
        .from(galleryVariants)
        .innerJoin(variants, eq(variants.id, galleryVariants.variantID))
        .innerJoin(photos, eq(photos.id, galleryVariants.photoID))
        .where(eq(variants.id, sql.placeholder("variantID")))
        .orderBy(asc(galleryVariants.order), asc(photos.originalName))
        .prepare();

    return await req.execute({
        variantID,
    });
};

const removeToGallery = async ({ photoID, variantId }: { photoID: number; variantId: number }) => {
    const request = db
        .delete(galleryVariants)
        .where(
            and(
                eq(galleryVariants.photoID, sql.placeholder("photo_id")),
                eq(galleryVariants.variantID, sql.placeholder("variant_id")),
            ),
        )
        .prepare();
    await request.execute({
        photo_id: photoID,
        variant_id: variantId,
    });
};

/**
 *
 * Suppression multiple des photos associées à la variante
 * @param id id de la variante
 */
export const removePhotosGalleryFromVariantID = async (id: number, photosIDs: number[]) => {
    const galleries = await getGalleryCollectionForVariants(id);

    for (const photo of galleries) {
        if (photosIDs.includes(photo.id)) {
            try {
                await removeToGallery({ photoID: photo.id, variantId: id });
                await removePhotosByAndFile([photo.id], "properties");
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                    continue;
                }
            }
        }
    }
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
