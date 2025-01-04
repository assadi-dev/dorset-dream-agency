import { db } from "@/database";
import { eq, like, sql } from "drizzle-orm";
import { removeFile } from "@/lib/fileSystem";
import path from "path";
import { STORAGE_DIR } from "@/config/dir";
import { files } from "../schema/files";

export const insertFiles = async (data: any) => {
    const prepare = db
        .insert(files)
        .values({
            originalName: sql.placeholder("originaleName"),
            size: sql.placeholder("size"),
            mimeType: sql.placeholder("mimeType"),
            path: sql.placeholder("path"),
        })
        .prepare();

    const result = await prepare.execute({
        originaleName: data.originaleName,
        size: data.size,
        mimeType: data.mimeType,
        path: data.path,
    });
    const photo = await getOneFileByID(result[0].insertId);
    return photo;
};

export const getOneFileByID = async (id: number | string) => {
    try {
        const request = db
            .select()
            .from(files)
            .where(eq(files.id, sql.placeholder("id")))
            .prepare();
        const result = await request.execute({
            id,
        });
        return result[0];
    } catch (error) {
        return null;
    }
};

export const findFileByPath = async (path: string) => {
    try {
        const query = db
            .select()
            .from(files)
            .where(like(files.path, sql.placeholder("path")))
            .prepare();
        const result = await query.execute({ path: `%${path}%` });
        return result[0];
    } catch (error) {
        return null;
    }
};

export const deleteFileByID = async (id: number | string) => {
    const file = await getOneFileByID(id);

    if (file) {
        const request = db
            .delete(files)
            .where(eq(files.id, sql.placeholder("id")))
            .prepare();
        await request.execute({
            id,
        });
    }
};

type contextFilesPathType = "announcements/saves" | "announcements/creations";

/**
 * Suppression des fichier
 * @param ids list des id des fichier
 * @param contextPath le dossier contenant les fichiers
 */
export const removeFilesByIdAndFile = async (ids: number[] | string[]) => {
    if (ids) {
        for (const id of ids) {
            const file = await getOneFileByID(id);
            if (file) {
                const key = file.path;
                await remove(key);
                await deleteFileByID(file.id);
            }
        }
    }
};

/**
 * Suppression du fichiers
 * @param key identifiant unique utilisé aux renommage de fichier + extension
 */
export const remove = async (key: string) => {
    try {
        if (!path) throw new Error("filepath is missing");
        const filepath = path.join(STORAGE_DIR, key);
        await removeFile(filepath);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
