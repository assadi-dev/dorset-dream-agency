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
                grade: employees.post,
                iban: employees.iban,
                secteur: sql<string>`GROUP_CONCAT(${secteurs.name}) `,
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
