"use server";
import { db } from "@/database";
import { employees } from "@/database/drizzle/schema/employees";
import { sql } from "drizzle-orm";
import { gestionEmployeeSchemaType } from "./_components/forms/schema";
import { updateEmployee } from "@/database/drizzle/repositories/employee";
import { uploadPhotoEmployee } from "@/database/drizzle/repositories/employeeFIle";

export const getEmployeeCollections = async () => {
    try {
        const response = await db
            .select({
                id: employees.id,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                grade: sql<string>`N/A`,
                iban: employees.iban,
                secteur: sql<string>`"inconnue"`,
            })
            .from(employees);

        return response;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const editEmployeeData = async (id: number, values: any) => {
    await updateEmployee(id, values);
    return;
};

export const uploadEmployeePhoto = async (formData: FormData) => {
    return await uploadPhotoEmployee(formData);
};
