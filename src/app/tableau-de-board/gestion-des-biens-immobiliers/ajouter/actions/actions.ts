"use server";
import { db } from "@/database";
import { propertyFormType, VariantFormType } from "../_components/form/propertySchema";
import { properties } from "@/database/drizzle/schema/properties";
import { sql } from "drizzle-orm";
import { createPropertyDto } from "./dto/propertyDTO";
import { variants } from "@/database/drizzle/schema/variants";

import { ENV } from "@/config/global";
import { galleryVariants } from "@/database/drizzle/schema/galleryVariant";

type InsertProperty = Omit<propertyFormType, "variants">;
export const insertProperty = async (values: InsertProperty) => {
    try {
        const validateInput = await createPropertyDto(values);

        if (validateInput.error) throw validateInput.error;

        const result = await db
            .insert(properties)
            .values({
                ...validateInput.data,
                categoryID: values.categoryProperty,
            })
            .$returningId();
        const id: number = result[0].id;

        const newProperty = await db
            .select()
            .from(properties)
            .where(sql<string>`id=${id}`);
        return newProperty[0];
    } catch (error: any) {
        throw error;
    }
};

export const insertVariant = async (name: string, propertyID: number) => {
    try {
        const prepare = db
            .insert(variants)
            .values({
                name: sql.placeholder("name"),
                propertyID: sql.placeholder("propertyID"),
            })
            .prepare();

        const result = await prepare.execute({
            name: name,
            propertyID,
        });

        return { id: result[0].insertId };
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
