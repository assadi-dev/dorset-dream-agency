"use server";

import { auth, unstable_update } from "@/auth";
import { uploadPhotoEmployee } from "@/database/drizzle/repositories/employeeFIle";

export const updateImageSession = async (formData: FormData) => {
    const session = await auth();
    if (!formData.get("file")) throw new Error("photo is empty");

    const result = await uploadPhotoEmployee(formData);

    return result;
};
