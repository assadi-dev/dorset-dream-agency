import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { deleteFileByID, findFileByPath, insertFiles, removeFilesByIdAndFile } from "./files";
import { UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, UPLOAD_ANNOUNCEMENT_DIR_SAVES } from "@/config/dir";
import fs, { existsSync, rmSync } from "fs";
import path from "path";
import { findOneByID } from "./announcements";

export const uploadAnnounceFile = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS)) {
        await fs.promises.mkdir(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, { recursive: true });
        await fs.promises.chmod(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, fs.constants.O_RDWR);
    }

    if (!formData.get("announce")) throw new Error("No files received.");
    const file = formData.get("announce") as File;

    const { size, fileName, mimetype, originaleFileName } = fileNameChange(file);

    const destination = path.join(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, fileName);
    await saveBuffer({
        destination,
        file,
    });

    //Sauvegarde dans la base de donnée
    return await insertFiles({
        size,
        originaleName: originaleFileName,
        mimeType: mimetype,
        path: `/announcements/creations/${fileName}`,
    });
};

export const uploadSaveFile = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_ANNOUNCEMENT_DIR_SAVES)) {
        await fs.promises.mkdir(UPLOAD_ANNOUNCEMENT_DIR_SAVES, { recursive: true });
        await fs.promises.chmod(UPLOAD_ANNOUNCEMENT_DIR_SAVES, fs.constants.O_RDWR);
    }

    if (!formData.get("save")) throw new Error("No settings file received.");
    const file = formData.get("save") as File;

    const { size, fileName, mimetype, originaleFileName } = fileNameChange(file);
    const destination = path.join(UPLOAD_ANNOUNCEMENT_DIR_SAVES, fileName);
    await saveBuffer({
        destination,
        file,
    });

    //Sauvegarde dans la base de donnée
    return await insertFiles({
        size,
        originaleName: originaleFileName,
        mimeType: mimetype,
        path: `/announcements/saves/${fileName}`,
    });
};

export const removeAnnounceFiles = async (id: number) => {
    const announce = await findOneByID(id);
    const ids: number[] = [];
    if (announce) {
        if (announce.path) {
            const creationFile = await findFileByPath(announce.path);
            if (creationFile) ids.push(creationFile.id);
        }
        if (announce.settings) {
            const settingsFile = await findFileByPath(announce.settings);
            if (settingsFile) ids.push(settingsFile.id);
        }
        await removeFilesByIdAndFile(ids);
    }
};

/**
 * retourne le fileName du fichier
 * @param pathFile chemin du fichier
 * @returns {string}  ex: 1735990686401.json
 */
export const extractKey = (pathFile: string) => {
    const key = pathFile.split("/").slice(-1).join();
    return key.trim();
};
