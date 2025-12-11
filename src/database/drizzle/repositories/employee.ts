"use server";

import { db } from "@/database";
import { and, asc, desc, eq, isNull, like, or, sql } from "drizzle-orm";
import { employees } from "../schema/employees";
import { secteurs } from "../schema/secteurs";
import { employeesToSecteurs } from "../schema/employeesToSecteurs";
import { EmployeeCreateInputDto, employeeValidator } from "./dto/employeeDTO";
import { generateDescription, selectWithSoftDelete, setDeletedAt, withPagination } from "./utils/entity";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { removePhotosByAndFile } from "./photos";
import { photos } from "../schema/photos";
import { users } from "../schema/users";
import { deleteAccounts } from "./users";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(employees);

/**
 * Insertion des donné de l'employé
 */
export const insertEmployee = async (values: EmployeeCreateInputDto) => {
    try {
        const employeeValidation = employeeValidator(values);
        if (employeeValidation.error) throw employeeValidation.error;

        if (values.userID) employeeValidation.data.userID = values.userID;

        const request = await db.insert(employees).values(employeeValidation.data).$returningId();
        const employeeId = request[0].id;
        const employee = await getOneEmployee(employeeId);

        if (values.secteursIds) {
            await addSecteurToSecteurToEmployee(employeeId, values.secteursIds);
        }

        const description = await generateDescription(`Ajout d'employé ${employee.firstName} ${employee.lastName}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "create",
                name: ACTION_NAMES.employees.create,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.EMPLOYEES,
            });
        }
        return employeeId;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

type getEmployeeCollectionsArgs = FilterPaginationType;
export const getEmployeeCollections = async (filter: getEmployeeCollectionsArgs) => {
    try {
        const { page, limit, order, search } = filter;
        const query = db
            .select({
                id: employees.id,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                lastName: employees.lastName,
                firstName: employees.firstName,
                gender: employees.gender,
                iban: employees.iban,
                secteur: sql<string>`GROUP_CONCAT(${secteurs.name}) `,
                phone: employees.phone,
                photoID: photos.id,
                photoUrl: photos.url,
                role: users.role,
            })
            .from(employees)
            .groupBy(employees.id)
            .leftJoin(users, eq(users.id, employees.userID))
            .leftJoin(employeesToSecteurs, eq(employees.id, employeesToSecteurs.employeeID))
            .leftJoin(secteurs, eq(secteurs.id, employeesToSecteurs.secteurId))
            .leftJoin(photos, eq(photos.id, employees.photoID))
            .orderBy(desc(employees.createdAt));

        const searchCondition = search
            ? or(
                  like(employees.lastName, sql.placeholder("search")),
                  like(employees.firstName, sql.placeholder("search")),
                  // like(employees.post, sql.placeholder("search")),
                  like(employees.iban, sql.placeholder("search")),
                  like(secteurs.name, sql.placeholder("search")),
                  like(employees.phone, sql.placeholder("search")),
              )
            : undefined;

        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        query.where(and(softDeleteCondition, searchCondition));
        const orderbyColumn = order === "asc" ? asc(employees.createdAt) : desc(employees.createdAt);

        const rowsCount = await query.execute({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const data = await withPagination(query.$dynamic(), orderbyColumn, page, limit, parameters);

        return {
            page,
            totalItems,
            limit,
            data,
        };
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

const getOneEmployee = async (id: number) => {
    try {
        const employeeReq = db
            .select({
                id: employees.id,
                firstName: employees.firstName,
                lastName: employees.lastName,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                gender: employees.gender,
                //  post: employees.post,
                iban: employees.iban,
                createdAt: employees.createdAt,
                photoID: photos.id,
                photoUrl: photos.url,
                role: users.role,
            })
            .from(employees)
            .leftJoin(users, eq(users.id, employees.userID))
            .leftJoin(photos, eq(photos.id, employees.photoID))
            .leftJoin(employeesToSecteurs, eq(employees.id, employeesToSecteurs.employeeID))
            .leftJoin(secteurs, eq(secteurs.id, employeesToSecteurs.secteurId))
            .where(and(softDeleteCondition, eq(employees.id, sql.placeholder("id"))))
            .prepare();
        const employee = await employeeReq.execute({ id });
        if (!employee) throw new Error("Employee not found");
        return employee[0];
    } catch (error) {
        throw error;
    }
};

export const getAccountEmployee = async (id: number) => {
    try {
        const employeeReq = db
            .select({
                id: employees.id,
                firstName: employees.firstName,
                lastName: employees.lastName,
                createdAt: employees.createdAt,
                userId: employees.userID,
            })
            .from(employees)
            .leftJoin(users, eq(users.id, employees.userID))
            .where(and(softDeleteCondition, eq(employees.id, sql.placeholder("id"))))
            .prepare();
        const employee = await employeeReq.execute({ id });
        if (!employee) throw new Error("Employee not found");
        return employee[0];
    } catch (error) {
        throw error;
    }
};

export const updateEmployee = async (id: number, values: any) => {
    try {
        const employee = await getOneEmployee(id);
        if (!employee) throw new Error("Employee not found");

        if (values?.secteursIds) {
            if (values?.secteursIds.length > 0) {
                await addSecteurToSecteurToEmployee(id, values.secteursIds);
            } else if (values?.secteursIds.length === 0) clearSecteurToEmployee(id);
        }

        const descriptionMessage =
            values.photoID !== null
                ? `Mise à jour de la photo de l'employé ${employee.firstName} ${employee.lastName}`
                : `Modification des infos de l'employé ${employee.firstName} ${employee.lastName}`;

        const request = db
            .update(employees)
            .set({ ...employee, ...values })
            .where(and(softDeleteCondition, eq(employees.id, sql.placeholder("id"))))
            .prepare();
        await request.execute({ id });
        const description = await generateDescription(descriptionMessage);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "update",
                name: values.photoID ? ACTION_NAMES.employees.updatePhoto : ACTION_NAMES.employees.update,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.EMPLOYEES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const deleteEmployee = async (ids: Array<number>) => {
    try {
        for (const id of ids) {
            const employee = await getOneEmployee(id);
            if (!employee) throw new Error("Cet employé n'existe plus");

            //Suppression du compte
            const account = await getAccountEmployee(id);

            if (account?.userId) {
                await deleteAccounts([account?.userId]);
                /*        const request = setDeletedAt(users)
                    ?.where(eq(users.id, sql.placeholder("userId")))
                    .prepare();

                await request?.execute({
                    userId: account?.userId,
                }); */
            }

            //  if (employee.photoID) await removePhotosByAndFile([employee.photoID], "employees");
            /* const req = db
                .delete(employees)
                .where(eq(employees.id, sql.placeholder("id")))
                .prepare(); 
            */
            const req = setDeletedAt(employees)?.where(eq(employees.id, sql.placeholder("id")));

            await req?.execute({ id });
            const extras = {
                userID: account?.userId,
                employeeID: employee.id,
            };
            const description = await generateDescription(
                `Suppression de l'employé ${employee.firstName} ${employee.lastName}`,
                extras,
            );

            if (description) {
                await insertUserAction({
                    user: description.user as string,
                    action: "delete",
                    name: ACTION_NAMES.employees.delete,
                    description: JSON.stringify(description),
                    grade: description.grade as string,
                    entity: ENTITIES_ENUM.EMPLOYEES,
                });
            }
        }
    } catch (error: any) {
        throw error;
    }
};

export const restoreEmployee = async (id: number) => {
    try {
        const result = db
            .update(employees)
            .set({
                deletedAt: null,
            })
            .where(eq(employees.id, sql.placeholder("id")))
            .prepare();
        await result.execute({ id });

        const employee = await getOneEmployee(id);

        const description = await generateDescription(
            `Restauration des donnés de l'employé ${employee.firstName} ${employee.lastName}`,
        );
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "restore",
                name: ACTION_NAMES.employees.restore,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.EMPLOYEES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const restoreEmployees = async (ids: number[]) => {
    for (const id of ids) {
        await restoreEmployee(id);
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
    } catch (error: any) {
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
    } catch (error: any) {
        throw error;
    }
};

export const addPhotoToEmployee = async ({ employeeID, photoID }: { employeeID: number; photoID: number }) => {
    try {
        const employee = await getOneEmployee(employeeID);
        if (employee.photoID) removePhotosByAndFile([employee.photoID], "employees");
        await updateEmployee(employeeID, {
            photoID,
        });
        const result = await getOneEmployee(employeeID);
        return result;
    } catch (error: any) {
        if (error instanceof Error) {
            throw error;
        }
    }
};
