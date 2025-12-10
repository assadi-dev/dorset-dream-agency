"use server";
import { db } from "@/database";
import { roles } from "../schema/roles";
import { eq, sql } from "drizzle-orm";
import { generateDescription } from "./utils/entity";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { CreateRoleInputs, UpdateRoleInputs } from "./dto/roleDTO";

export const createRole = async (inputs: CreateRoleInputs) => {
    try {
        const result = await db.insert(roles).values(inputs);
        const role = await findRoleByID(result[0].insertId);
        if (role) {
            const descriptionMessage = `Création du rôle ${role.name}`;
            const description = await generateDescription(descriptionMessage);
            if (description) {
                insertUserAction({
                    user: description.user as string,
                    action: "create",
                    name: ACTION_NAMES.roles.create,
                    description: JSON.stringify(description),
                    grade: description.role as string,
                    entity: ENTITIES_ENUM.ROLES,
                });
            }
        }
        return role;
    } catch (error: any) {
        throw error;
    }
};

export const findRoleByID = async (id: number) => {
    try {
        const query = db
            .select()
            .from(roles)
            .where(eq(roles.id, sql.placeholder("id")))
            .prepare();
        const result = await query.execute({ id });
        if (!result[0]) return null;
        return result[0];
    } catch (error: any) {
        throw error;
    }
};

export const updateRole = async (id: number, values: UpdateRoleInputs) => {
    try {
        const grade = await findRoleByID(id);
        if (!grade) throw Error("Grade no found");
        const request = db
            .update(roles)
            .set(values)
            .where(eq(roles.id, sql.placeholder("id")))
            .prepare();
        request.execute({
            id,
        });
        await request.execute({ id });

        const descriptionMessage = `Modification du rôle ${roles.name}`;
        const description = await generateDescription(descriptionMessage);
        if (description) {
            insertUserAction({
                user: description.user as string,
                action: "update",
                name: ACTION_NAMES.roles.update,
                description: JSON.stringify(description),
                grade: description.role as string,
                entity: ENTITIES_ENUM.ROLES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const deleteRole = async (id: number) => {
    try {
        const grade = await findRoleByID(id);
        if (!grade) throw Error("Role no found");
        const request = db
            .delete(roles)
            .where(eq(roles.id, sql.placeholder("id")))
            .prepare();
        await request.execute({
            id,
        });

        const descriptionMessage = `Suppression du rôle ${grade.name}`;
        const description = await generateDescription(descriptionMessage);
        if (description) {
            insertUserAction({
                user: description.user as string,
                action: "delete",
                name: ACTION_NAMES.grades.delete,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.GRADES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const deleteMultipleRole = async (ids: number[]) => {
    try {
        for (const id of ids) {
            try {
                await deleteRole(id);
            } catch (error) {
                continue;
            }
        }
    } catch (error) {
        throw error;
    }
};
