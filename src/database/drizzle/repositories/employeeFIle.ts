import { fileNameChange, saveBuffer, UPLOAD_DIR_EMPLOYEES } from "@/lib/fileSystem";
import fs from "fs";
import path from "path";
import { insertPhoto } from "./photos";
import { ENV } from "@/config/global";
import { addPhotoToEmployee } from "./employee";

export const uploadPhotoEmployee = async (formData: FormData) => {
    if (!fs.existsSync(UPLOAD_DIR_EMPLOYEES)) {
        await fs.promises.mkdir(UPLOAD_DIR_EMPLOYEES, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR_EMPLOYEES, fs.constants.O_RDWR);
    }

    const employeeID = Number(formData.get("employeeID"));

    const files = formData.getAll("file");
    for (const file of files as Array<File>) {
        const { fileName, originaleFileName, mimetype, size } = fileNameChange(file);
        const destination = path.join(UPLOAD_DIR_EMPLOYEES, fileName);
        await saveBuffer({
            destination,
            file,
        });
        //Save to database
        const photo = await insertPhoto({
            originaleName: originaleFileName,
            size: size,
            mimeType: mimetype,
            url: `${ENV.DOMAIN}/api/photo/employee/${fileName}`,
        });

        if (photo) {
            //Insertion de la photo vers la table employee
            return await addPhotoToEmployee({ employeeID, photoID: photo?.id });
        }
    }
};
