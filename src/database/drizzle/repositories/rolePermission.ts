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
import { findPermissionByName } from "./permissions";

const whereConditionForFind = and(
    eq(rolePermissions.roleId, sql.placeholder("roleId")),
    eq(rolePermissions.permissionId, sql.placeholder("permissionId")),
);
const whereConditionForDelete = and(
    eq(rolePermissions.roleId, sql.placeholder("roleId")),
    inArray(rolePermissions.permissionId, sql.placeholder("permissionIds")),
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

export const grantedActionsToRole = async ({
    actionsToAdd,
    roleId,
    grantedBy,
    ressource,
}: GrantedRolePermissionBaseInputs) => {
    const success = { ressource, actions: [] } as { ressource: string; actions: string[] };
    for (const action of actionsToAdd) {
        try {
            const findAction = await findPermissionByName(`${ressource}:${action}`);
            if (!findAction) throw new Error(`action ${action} no found for ressource ${ressource}`);
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

export const removeRoleRolePermission = async ({
    roleId,
    permissionIds,
}: {
    roleId: number;
    permissionIds: number[];
}) => {
    try {
        const request = db.delete(rolePermissions).where(whereConditionForDelete).prepare();
        await request.execute({
            roleId,
            permissionIds,
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
