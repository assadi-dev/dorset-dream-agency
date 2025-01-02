import { db } from "@/database";
import { desc, eq, sql } from "drizzle-orm";
import { AnnounceCreateInputDto, announceValidator } from "./dto/announcementDTO";
import { announcements } from "../schema/announcements";
import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { insertFiles } from "./files";
import { UPLOAD_ANNOUNCEMENT_DIR_CREATIONS } from "@/config/dir";
import fs from "fs";
import path from "path";

export const uploadAnnounceFile = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS)) {
        await fs.promises.mkdir(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, { recursive: true });
        await fs.promises.chmod(UPLOAD_ANNOUNCEMENT_DIR_CREATIONS, fs.constants.O_RDWR);
    }

    const files = formData.getAll("files") as File[];
    if (!files.length) {
        throw new Error("No files received.");
    }

    for (const file of files as Array<File>) {
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
    }
};
