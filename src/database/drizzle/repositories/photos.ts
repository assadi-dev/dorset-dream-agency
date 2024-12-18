import { db } from "@/database";
import { photos } from "../schema/photos";
import { eq, sql } from "drizzle-orm";
import { extractIdFromUrl, removeFile, UPLOAD_DIR_PROPERTIES } from "@/lib/fileSystem";
import path from "path";
import { UPLOAD_DIR_IMAGES } from "@/config/dir";

export const insertPhoto = async (data: any) => {
    const prepare = db
        .insert(photos)
        .values({
            originalName: sql.placeholder("originaleName"),
            size: sql.placeholder("size"),
            mimeType: sql.placeholder("mimeType"),
            url: sql.placeholder("url"),
        })
        .prepare();

    const result = await prepare.execute({
        originaleName: data.originaleName,
        size: data.size,
        mimeType: data.mimeType,
        url: data.url,
    });
    const photo = await getOnePhotosByID(result[0].insertId);
    return photo;
};

export const getOnePhotosByID = async (id: number | string) => {
    try {
        const request = db
            .select()
            .from(photos)
            .where(eq(photos.id, sql.placeholder("id")))
            .prepare();
        const result = await request.execute({
            id,
        });
        return result[0];
    } catch (error) {
        return null;
    }
};

export const deletePhotoByID = async (id: number | string) => {
    const photo = await getOnePhotosByID(id);

    if (photo) {
        const request = db
            .delete(photos)
            .where(eq(photos.id, sql.placeholder("id")))
            .prepare();
        await request.execute({
            id,
        });
    }
};

type contextPathType = "properties" | "perquisitions" | "employees";

/**
 * Suppression des photos + fichiers
 * @param ids list des id des photos
 * @param contextPath le dossier contenant les fichiers
 */
export const removePhotosByAndFile = async (ids: number[] | string[], contextPath: contextPathType) => {
    if (ids) {
        for (const id of ids) {
            const photo = await getOnePhotosByID(id);
            if (photo) {
                const key = extractIdFromUrl(photo.url);
                remove(key, contextPath);
                await deletePhotoByID(photo.id);
            }
        }
    }
};

/**
 * Suppression du fichier lié aux photos
 * @param key identifiant unique utilisé aux renommage de fichier + extension
 * @param folder le dossier contenant les fichiers
 */
export const remove = async (key: string, folder: string) => {
    try {
        if (!folder) throw new Error("filepath is missing");
        const filepath = path.join(UPLOAD_DIR_IMAGES, folder, key);
        await removeFile(filepath);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
