"use server";

import { db } from "@/database";
import { and, eq, sql } from "drizzle-orm";
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
        if (!employee) throw new Error("Employee not found");

        if (values.secteursIds.length) {
            await addSecteurToSecteurToEmployee(id, values.secteursIds);
        } else if (values.secteursIds.length === 0) clearSecteurToEmployee(id);

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

export const addSecteurToSecteurToEmployee = async (employeeID: number, secteurIds: Array<number>) => {
    try {
        const secteurEmployee = await db
            .select({
                secteurID: employeesToSecteurs.secteurId,
            })
            .from(employeesToSecteurs)
            .where(eq(employeesToSecteurs.employeeID, employeeID));

        if (secteurEmployee.length > 0) {
            await clearSecteurToEmployee(employeeID);
        }

        for (const secteurId of secteurIds) {
            await db.insert(employeesToSecteurs).values({
                employeeID,
                secteurId,
            });
        }
    } catch (error) {
        throw error;
    }
};

export const clearSecteurToEmployee = async (employeeID: number) => {
    try {
        const secteurEmployee = await db
            .select({
                secteurID: employeesToSecteurs.secteurId,
            })
            .from(employeesToSecteurs)
            .where(eq(employeesToSecteurs.employeeID, employeeID));

        for (const secteur of secteurEmployee) {
            const req = db
                .delete(employeesToSecteurs)
                .where(
                    and(
                        eq(employeesToSecteurs.secteurId, sql.placeholder("secteurID")),
                        eq(employeesToSecteurs.employeeID, sql.placeholder("employeeID")),
                    ),
                )
                .prepare();
            await req.execute({ secteurID: secteur.secteurID, employeeID });
        }
    } catch (error) {
        throw error;
    }
};
