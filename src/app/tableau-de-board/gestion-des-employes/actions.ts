"use server";
import { db } from "@/database";
import { employees } from "@/database/drizzle/schema/employees";
import { sql } from "drizzle-orm";

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
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
