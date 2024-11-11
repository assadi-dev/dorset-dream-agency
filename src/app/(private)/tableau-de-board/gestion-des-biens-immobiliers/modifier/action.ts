"use server";

import { removeVariantsWithGallery } from "@/database/drizzle/repositories/variants";

export const clearVariantsWithGallery = async (formData: FormData) => {
    if (formData.getAll("ids")) {
        const variantsIds = formData.getAll("ids").map((v) => Number(v));
        await removeVariantsWithGallery(variantsIds);
    }
};
