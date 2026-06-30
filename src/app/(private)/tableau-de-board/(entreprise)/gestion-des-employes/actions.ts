"use server";
import { db } from "@/database";
import { employees } from "@/database/drizzle/schema/employees";
import { sql } from "drizzle-orm";
import { gestionEmployeeSchemaType } from "./_components/forms/schema";
import { deleteEmployee, insertEmployee, updateEmployee } from "@/database/drizzle/repositories/employee";
import { uploadPhotoEmployee } from "@/database/drizzle/repositories/employeeFIle";
import { revalidatePath } from "next/cache";
import { insertUserAccount } from "@/database/drizzle/repositories/users";
import { GestionEmployeeFormType } from "../../administrations/gestion-des-comptes/_components/forms/schema";

const PATH_EMPLOYEE = "/tableau-de-board/gestion-des-employes";

export const getEmployeeCollections = async () => {
    try {
        const response = await db
            .select({
                id: employees.id,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                grade: employees.post,
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
    revalidatePath(PATH_EMPLOYEE);
    return;
};

export const uploadEmployeePhoto = async (formData: FormData) => {
    revalidatePath(PATH_EMPLOYEE);
    return await uploadPhotoEmployee(formData);
};


export const createEmployee = async (values: GestionEmployeeFormType & {
    userID?: any;
},) => {
    const newUser = await insertUserAccount(values);
    values.userID = newUser?.id;
    const secteursIds = values.secteur.map((secteur) => Number(secteur.value));
    await insertEmployee({ ...values, secteursIds });
    revalidatePath(PATH_EMPLOYEE);
    return;
};

export const deleteEmployeeAction = async (ids: number[]) => {
    await deleteEmployee(ids);
    revalidatePath(PATH_EMPLOYEE);
    return;
};