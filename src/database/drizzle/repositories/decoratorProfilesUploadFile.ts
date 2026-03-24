import { db } from "@/database";
import { decoratorProfiles } from "../schema/decoratorProfile";
import { sendToUserActions, withPagination } from "./utils/entity";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { FilterPaginationType } from "@/database/types";
import { asc, desc, eq, inArray, like, or, sql } from "drizzle-orm";
import { photos } from "../schema/photos";
import { insertPhoto } from "./photos";
import { UPLOAD_DIR_DECORATORS } from "@/lib/fileSystem";
import * as fs from "fs";
import path from "path";
import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { updateDecoratorProfile } from "./decoratorProfiles";



export const uploadPhotoDecorator = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_DIR_DECORATORS)) {
        await fs.promises.mkdir(UPLOAD_DIR_DECORATORS, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR_DECORATORS, fs.constants.O_RDWR);
    }

    const decoratorProfileID = Number(formData.get("decoratorProfileID"));

    const files = formData.getAll("file");
    for (const file of files as Array<File>) {
        const { fileName, originaleFileName, mimetype, size } = fileNameChange(file);
        const destination = path.join(UPLOAD_DIR_DECORATORS, fileName);
        await saveBuffer({
            destination,
            file,
        });
        //Save to database
        const photo = await insertPhoto({
            originaleName: originaleFileName,
            size: size,
            mimeType: mimetype,
            url: `/photo/decorator/${fileName}`,
        });

        if (photo) {
            updateDecoratorProfile(decoratorProfileID, { photoID: photo?.id });
          return photo;
        }
        else {
            throw new Error("Error saving photo");
        }
    }
};