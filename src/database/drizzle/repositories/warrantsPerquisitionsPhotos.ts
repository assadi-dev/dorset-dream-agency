"use server";

import { db } from "@/database";
import { warrantPerquisitions } from "../schema/warrantPerquisitions";
import { asc, eq, sql } from "drizzle-orm";
import { warrantPerquisitionToPhotos } from "../schema/warrantPerquisitionToPhotos";
import { clients } from "../schema/client";
import { photos } from "../schema/photos";
import { fileNameChange, saveBuffer, UPLOAD_DIR_PERQUISITION } from "@/lib/fileSystem";
import fs from "fs";
import path from "path";
import { insertPhoto } from "./photos";
import { ENV } from "@/config/global";
import { WarrantsPerquisitionsPhotosInputs } from "./dto/warrantsPerquisitionsPhotosDTO";
import { plural } from "@/lib/format";

export const insertWarrantPerquisitionPhoto = async (values: WarrantsPerquisitionsPhotosInputs) => {
    const request = db.insert(warrantPerquisitionToPhotos).values({
        warrantPerquisitionID: values.warrantPerquisitionID,
        photoID: values.photoID,
    });

    await request;
};

export const getWarrantPerquisitionPhotosForClient = async (id: number) => {
    const request = db
        .select({
            id: photos.id,
            url: photos.url,
            originalName: photos.originalName,
            size: photos.size,
            type: photos.mimeType,
        })
        .from(warrantPerquisitionToPhotos)
        .leftJoin(warrantPerquisitions, eq(clients.id, warrantPerquisitions.clientID))
        .leftJoin(warrantPerquisitionToPhotos, eq(photos.id, warrantPerquisitionToPhotos.photoID))
        .where(eq(warrantPerquisitions.clientID, sql.placeholder("id")))
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
    const warrantPerquisitionID = Number(formData.get("warrantPerquisitionID"));
    const files = formData.getAll("files");
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
            await insertWarrantPerquisitionPhoto({ warrantPerquisitionID, photoID: photo?.id });
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
