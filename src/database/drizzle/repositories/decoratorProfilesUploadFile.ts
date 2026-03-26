import { deletePhotoByID, getOnePhotosByID, insertPhoto } from "./photos";
import { UPLOAD_DIR_DECORATORS } from "@/lib/fileSystem";
import * as fs from "fs";
import path from "path";
import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { updateDecoratorProfile } from "./decoratorProfiles";



export const uploadPhotoDecorator = async ({
    files,
    decoratorProfileID
}: {
    files: File[];
    decoratorProfileID: number;
}) => {
    if (!fs.existsSync(UPLOAD_DIR_DECORATORS)) {
        await fs.promises.mkdir(UPLOAD_DIR_DECORATORS, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR_DECORATORS, fs.constants.O_RDWR);
    }

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


export const shouldRemovePhotoDecorator = async ({
    photoID
}: {
    photoID: number;
}) => {
   try {
    const photo = await getOnePhotosByID(photoID);
    if (photo) {
        const fileName = photo.url.split("/").slice(-1)[0];
        const pathPhoto = path.join(UPLOAD_DIR_DECORATORS,fileName);
        console.log(pathPhoto);
        if (fs.existsSync(pathPhoto)) {
            await fs.promises.unlink(pathPhoto);
        }
        await deletePhotoByID(photoID);
    }
   } catch (error) {
    console.log(error);
   }
  
};