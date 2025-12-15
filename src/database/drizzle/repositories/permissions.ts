"use server";
import { db } from "@/database";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { CreatePermissionInputs, UpdatePermissionInputs } from "./dto/permissionDTO";
import { generateDescription } from "./utils/entity";
import { permissions } from "../schema/permissions";
import { eq, sql } from "drizzle-orm";

export const createPermission = async (inputs: CreatePermissionInputs) => {
    const result = await db.insert(permissions).values(inputs);
    const permission = await findPermissionById(result[0].insertId);
    if (permission) {
        const descriptionMessage = `Ajout permission ${permission.displayName}`;
        registerLogPermissionAction("create", descriptionMessage, ACTION_NAMES.permissions.create);
    }
};
export const findPermissionById = async (id: number) => {
    try {
        const query = db
            .select()
            .from(permissions)
            .where(eq(permissions.id, sql.placeholder("id")))
            .prepare();
        const result = await query.execute({ id });
        if (!result[0]) return null;
        return result[0];
    } catch (error: any) {}
};
export const findPermissionByName = async (name: string) => {
    try {
        const query = db
            .select()
            .from(permissions)
            .where(eq(permissions.name, sql.placeholder("name")))
            .prepare();
        const result = await query.execute({ name });
        if (!result[0]) return null;
        return result[0];
    } catch (error: any) {
        return null;
    }
};
export const updatePermission = async (id: number, values: UpdatePermissionInputs) => {
    const permission = await findPermissionById(id);
    if (!permission) throw Error("permission no found");

    const query = db
        .update(permissions)
        .set(values)
        .where(eq(permissions.id, sql.placeholder("id")))
        .prepare();
    query.execute({
        id,
    });

    if (permission) {
        const descriptionMessage = `Modification de la permission ${permission.displayName}`;
        registerLogPermissionAction("delete", descriptionMessage, ACTION_NAMES.permissions.update);
    }
};
export const deletePermission = async (id: number) => {
    const permission = await findPermissionById(id);
    if (!permission) throw Error("permission no found");
    await db.delete(permissions).where(eq(permissions.id, sql.placeholder("id")));
    if (permission) {
        const descriptionMessage = `Suppression de la permission ${permission.displayName}`;
        registerLogPermissionAction("delete", descriptionMessage, ACTION_NAMES.permissions.delete);
    }
};
export const deleteMultiplePermission = async (ids: number[]) => {
    for (const id of ids) {
        try {
            await deletePermission(id);
        } catch (error) {
            continue;
        }
    }
};

const registerLogPermissionAction = async (
    action: "create" | "update" | "delete" | "restore",
    message: string,
    name: string,
) => {
    const descriptionMessage = message;
    const description = await generateDescription(descriptionMessage);
    if (description) {
        insertUserAction({
            user: description.user as string,
            action: action,
            name: name,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.PERMISSIONS,
        });
    }
};
