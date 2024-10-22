"use server";
import { db } from "@/database";
import { ENV } from "@/config/global";
import { galleryVariants } from "@/database/drizzle/schema/galleryVariant";
import { insertVariant } from "./variants";

export const insertGallery = (variantID: number, photoID: number) => {
    try {
        return db.insert(galleryVariants).values({
            variantID,
            photoID,
        });
    } catch (error: any) {
        throw error;
    }
};

export const createVariantGallery = async (formData: FormData) => {
    try {
        const propertyID = Number(formData.get("propertyID"));
        const name = String(formData.get("name"));
        const files = formData.getAll("files");
        if (!files) return;

        const response = await uploadPhotoProperty(formData);
        const variant = await insertVariant(name, propertyID);

        for (const photo of response.photos) {
            const variantID = variant.id;
            const photoID = photo;
            await insertGallery(variantID, photoID);
        }
    } catch (error: any) {
        throw error;
    }
};

export const uploadPhotoProperty = async (formData: FormData): Promise<{ message: string; photos: Array<number> }> => {
    try {
        const response = await fetch(ENV.DOMAIN + "/api/uploads/photos/properties", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error occurred:", error.message || error);
        throw error;
    }
};
