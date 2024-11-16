import { ENV } from "@/config/global";
import * as fs from "fs";
import path from "path";
import { Readable } from "stream";

/**
 * Renommage de fichier retour un object contenant les element du fichier  (le fichier renommé,extension,mimetype).
 * @param file
 *
 */

export const fileNameChange = (file?: File) => {
    if (!file) throw new Error("file missing for rename");
    const originaleFileName = file.name;
    const fileName = Date.now();
    const extension = originaleFileName.split(".").slice(-1).join().trim();
    return {
        originaleFileName,
        fileName: `${fileName}.${extension}`,
        extension,
        mimetype: file.type,
        size: file.size,
    };
};

type saveBufferArgs = {
    destination: string;
    file: File;
};
export const saveBuffer = ({ destination, file }: saveBufferArgs) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mimeType = file.type;
            const buffer = await file.arrayBuffer();
            const readableStream = new Readable();
            readableStream._read = () => {};
            readableStream.push(Buffer.from(buffer));
            readableStream.push(null);

            const writeStream = fs.createWriteStream(destination);
            readableStream.pipe(writeStream);

            writeStream.on("finish", () => {
                resolve({ message: "File saved successfully", destination, mimeType });
            });

            writeStream.on("error", (err) => {
                reject({ message: "Error writing the file", error: err });
            });
        } catch (error: any) {
            reject({ message: "Error processing the file", error });
        }
    });
};

/**
 * Emplacement du dossier de stockage pour les photos de type properties
 */
export const UPLOAD_DIR_PROPERTIES = path.join(ENV.STORAGE_DIR, "images", "properties");
/**
 * Emplacement du dossier de stockage pour les photos de type perquisitions
 */
export const UPLOAD_DIR_PERQUISITION = path.join(ENV.STORAGE_DIR, "images", "perquisitions");

/**
 * Extraction de l'identifiant généré lors de l'upload du fichier à partir de l'url
 */
export const extractIdFromUrl = (url: string) => {
    const key = url.split("/").slice(-1)[0];
    return key;
};

export const removeFile = async (filepath: string) => {
    if (fs.existsSync(filepath)) {
        fs.rmSync(filepath);
    }
};

//export const createGallery;
