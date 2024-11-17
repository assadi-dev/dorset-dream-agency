"use server";

import { db } from "@/database";
import { perquisitions } from "../schema/perquisitions";
import { asc, eq, sql } from "drizzle-orm";
import { perquisitionToPhotos } from "../schema/perquisitionPhotos";
import { clients } from "../schema/client";
import { photos } from "../schema/photos";
import { fileNameChange, saveBuffer, UPLOAD_DIR_PERQUISITION } from "@/lib/fileSystem";
import fs from "fs";
import path from "path";
import { insertPhoto } from "./photos";
import { ENV } from "@/config/global";
import { PerquisitionsPhotosInputs } from "./dto/perquisitionsPhotosDTO";
import { plural } from "@/lib/format";

export const insertWarrantPerquisitionPhoto = async (values: PerquisitionsPhotosInputs) => {
    const request = db.insert(perquisitionToPhotos).values({
        perquisitionID: values.perquisitionID,
        photoID: values.photoID,
    });

    await request;
};

type PhotoResult = Omit<typeof photos.$inferSelect, "createdAt" | "updatedAt">;

/**
 * Retourne la collections de photos des perquisitions
 * @param id id de la perquisition
 * @returns
 */
export const getWarrantPerquisitionPhotos = async (id: number) => {
    const request = db
        .select({
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
        })
        .from(perquisitionToPhotos)
        .leftJoin(perquisitions, eq(perquisitions.id, perquisitionToPhotos.perquisitionID))
        .leftJoin(photos, eq(photos.id, perquisitionToPhotos.photoID))
        .where(eq(perquisitions.id, sql.placeholder("id")))
        .orderBy(asc(photos.originalName))
        .prepare();
    const result = await request.execute({
        id,
    });
    return result;
};

/**
 * sauvegarde + insertion des photos dans la galerie de mandat perquisitions
 *
 * #Propriétés attendus
 * @example
 * ```ts
 * const formData = new FormData()
 * formData.append("warrantPerquisitionID",1)
 * formData.append("files",file)
 *
 * ```
 *
 */
export const uploadPhotoPerquisition = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_DIR_PERQUISITION)) {
        await fs.promises.mkdir(UPLOAD_DIR_PERQUISITION, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR_PERQUISITION, fs.constants.O_RDWR);
    }

    const perquisitionID = Number(formData.get("perquisitionID"));
    const files = formData.getAll("files") as File[];
    if (!files.length) {
        throw new Error("No files received.");
    }
    const PHOTOS = [];

    for (const file of files as Array<File>) {
        const { fileName, originaleFileName, mimetype, size } = fileNameChange(file);
        const destination = path.join(UPLOAD_DIR_PERQUISITION, fileName);
        await saveBuffer({
            destination,
            file,
        });

        //Save to database
        const photo = await insertPhoto({
            originaleName: originaleFileName,
            size: size,
            mimeType: mimetype,
            url: `${ENV.DOMAIN}/api/photo/perquisition/${fileName}`,
        });

        if (photo) {
            //Insertion des photo à la gallery
            await insertWarrantPerquisitionPhoto({ perquisitionID, photoID: photo?.id });
        }

        PHOTOS.push(photo?.id);
    }
    const FILE_WORD = plural(files.length, "File", "Files");
    const success = {
        message: `${FILE_WORD} uploaded successfully.`,
        photos: PHOTOS,
    };
    return success;
};
