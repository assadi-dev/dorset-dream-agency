import { db } from "@/database";
import { photos } from "../schema/photos";
import { eq, sql } from "drizzle-orm";
import { extractIdFromUrl, removeFile, UPLOAD_DIR_PROPERTIES } from "@/lib/fileSystem";
import path from "path";
import { PROPERTIES_DIR, UPLOAD_DIR_IMAGES } from "@/config/dir";
import { createReadStream, createWriteStream } from "fs";

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

type genPhoto = {
    url: string;
    originalName: string;
    size: number;
    type: string;
    mimeType: string;
};

/**
 * Copy du fichier dans l'espace de stockage à partir de la key puis génération de l'entité photo
 *
 */
export const generatePhotoByKey = async (dir: string, photo: genPhoto) => {
    try {
        const { url, ...photoRest } = photo;
        const key = url.split("/photo/property/").slice(-1).join("").trim();
        const sourcePath = path.join(UPLOAD_DIR_IMAGES, dir, key);
        const extension = url.split(".").slice(-1).join("").trim();
        const fileName = `${Date.now()}.${extension}`;
        const destinationPath = path.join(UPLOAD_DIR_IMAGES, dir, `${fileName}`);
        // Créer les flux
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destinationPath);
        readStream.pipe(writeStream);
        return new Promise((resolve, reject) => {
            writeStream.on("finish", () => {
                resolve({
                    ...photoRest,
                    url: `/photo/property/${fileName}`,
                });
            });
            writeStream.on("error", reject);
        });
    } catch (error) {
        console.error("Erreur:", error);
        throw error;
    }
};
