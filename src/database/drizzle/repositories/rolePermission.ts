"use server";
import { db } from "@/database";
import { and, eq, inArray, sql } from "drizzle-orm";
import { reportException } from "@/lib/logger";
import { rolePermissions } from "../schema/rolePermissions";
import {
    CreateRolePermissionBaseInputs,
    FindOneRolePermissionField,
    GrantedRolePermissionBaseInputs,
} from "./dto/rolePermissionDTO";
import { findPermissionByName, findPermissionsByRessource } from "./permissions";

const whereConditionForFind = and(
    eq(rolePermissions.roleId, sql.placeholder("roleId")),
    eq(rolePermissions.permissionId, sql.placeholder("permissionId")),
);

export const insertRolePermission = async ({ permissionId, roleId, grantedBy }: CreateRolePermissionBaseInputs) => {
    try {
        await db.insert(rolePermissions).values({ permissionId, roleId, grantedBy });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            throw error;
        }
    }
};

const processRolePermissionToRemove = async ({
    roleId,
    resource,
    actionsToRemove,
}: Omit<GrantedRolePermissionBaseInputs, "actionsToAdd" | "grantedBy">) => {
    const permissionIdsToRemove: number[] = [];

    for (const action of actionsToRemove) {
        try {
            if (action === "all") {
                await removeAllPermissionToRessource({ roleId, resource });
                break;
            }
            const name = `${resource}:${action}`;
            const permissions = await findPermissionByName(name);
            permissions && permissionIdsToRemove.push(permissions.id);
            await removeRolePermission({ roleId, permissionIds: permissionIdsToRemove });
        } catch (error) {
            continue;
        }
    }
    permissionIdsToRemove.length && removeRolePermission({ roleId, permissionIds: permissionIdsToRemove });
};

const processRolePermissionToAdd = async ({
    roleId,
    resource,
    actionsToAdd,
    grantedBy,
}: Omit<GrantedRolePermissionBaseInputs, "actionsToRemove">) => {
    const success = { resource, actions: [] } as { resource: string; actions: string[] };

    for (const action of actionsToAdd) {
        try {
            const findAction = await findPermissionByName(`${resource}:${action}`);
            if (!findAction) throw new Error(`action ${action} no found for resource ${resource}`);
            const permissionId = findAction.id;
            if (permissionId) {
                await insertRolePermission({ permissionId, roleId, grantedBy });
                success.actions.push(findAction.action);
            }
        } catch (error) {
            continue;
        }
    }
    return success;
};

export const grantedActionsToRole = async ({
    actionsToAdd,
    actionsToRemove,
    roleId,
    grantedBy,
    resource,
}: GrantedRolePermissionBaseInputs) => {
    await processRolePermissionToRemove({ actionsToRemove, resource, roleId });
    return await processRolePermissionToAdd({ actionsToAdd, resource, roleId });
};

export const findRoleOneRolePermission = async ({ roleId, permissionId }: FindOneRolePermissionField) => {
    try {
        const request = db
            .select({
                roleId: rolePermissions.roleId,
                permissionId: rolePermissions.permissionId,
                grantedAt: rolePermissions.grantedAt,
            })
            .from(rolePermissions)
            .where(whereConditionForFind);

        const result = await request.execute({
            roleId,
            permissionId,
        });

        return result[0];
    } catch (error) {
        return null;
    }
};

export const removeAllPermissionToRessource = async ({ roleId, resource }: { roleId: number; resource: string }) => {
    const permissions = await findPermissionsByRessource(resource);
    if (permissions.length) {
        const permissionIds = permissions.map((p) => p.id);
        await removeRolePermission({ roleId, permissionIds });
    }
};

export const removeRolePermission = async ({ roleId, permissionIds }: { roleId: number; permissionIds: number[] }) => {
    try {
        const whereConditionForDelete = and(
            eq(rolePermissions.roleId, sql.placeholder("roleId")),
            inArray(rolePermissions.permissionId, permissionIds),
        );
        const request = db.delete(rolePermissions).where(whereConditionForDelete).prepare();
        await request.execute({
            roleId,
        });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            throw error;
        }
    }
};

export const grantedActionsToRoleMultiple = async (inputs: GrantedRolePermissionBaseInputs[]) => {
    const success: any[] = [];
    for (const grantedRolePermission of inputs) {
        try {
            const result = await grantedActionsToRole(grantedRolePermission);

            if (result) success.push(result);
        } catch (error) {
            continue;
        }
    }
    return success;
};
