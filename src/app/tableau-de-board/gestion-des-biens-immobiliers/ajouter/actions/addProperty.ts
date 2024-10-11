"use server";
import { db } from "@/database";
import { propertyFormType } from "../_components/form/propertySchema";
import { properties } from "@/database/drizzle/schema/properties";
import { sql } from "drizzle-orm";
import { createPropertyDto } from "./dto/propertyDTO";

export const insertProperty = async (values: propertyFormType) => {
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
    } catch (error) {
        throw error;
    }
};
