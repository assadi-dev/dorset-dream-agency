import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { insertFiles } from "./files";
import { UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, UPLOAD_ANNOUNCEMENT_DIR_SAVES } from "@/config/dir";
import fs from "fs";
import path from "path";

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
        path: `/announcements/save/${fileName}`,
    });
};
