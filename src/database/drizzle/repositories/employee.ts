"use server";

import { db } from "@/database";
import { eq, sql } from "drizzle-orm";
import { employees } from "../schema/employees";
import { secteurs } from "../schema/secteurs";
import { employeesToSecteurs } from "../schema/employeesToSecteurs";

export const getEmployeeCollections = async () => {
    try {
        const response = await db
            .select({
                id: employees.id,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                lastName: employees.lastName,
                firstName: employees.firstName,
                grade: employees.post,
                gender: employees.gender,
                iban: employees.iban,
                secteur: sql<string>`GROUP_CONCAT(${secteurs.name}) `,
                phone: employees.phone,
            })
            .from(employees)
            .groupBy(employees.id)
            .leftJoin(employeesToSecteurs, eq(employees.id, employeesToSecteurs.employeeID))
            .leftJoin(secteurs, eq(secteurs.id, employeesToSecteurs.secteurId));

        return response;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const updateEmployee = async (id: number, values) => {
    try {
        const employeeReq = db
            .select()
            .from(employees)
            .where(eq(employees.id, sql.placeholder("id")))
            .prepare();
        const employee = await employeeReq.execute({ id });

        const request = db
            .update(employees)
            .set({ ...employee, ...values })
            .where(eq(employees.id, sql.placeholder("id")))
            .prepare();
        return await request.execute({ id });
    } catch (error) {
        throw error;
    }
};
