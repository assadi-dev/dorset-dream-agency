import { db } from "@/database";
import { and, eq, sql } from "drizzle-orm";
import { reportException } from "@/lib/logger";
import { rolePermissions } from "../schema/rolePermissions";
import { CreateRoleRolePermissionBaseInputs, FindRoleRolePermissionField } from "./dto/rolePermissionDTO";

const whereCondition = and(
    eq(rolePermissions.roleId, sql.placeholder("roleId")),
    eq(rolePermissions.permissionId, sql.placeholder("permissionId")),
);

export const insertRolePermission = async ({ permissionId, roleId, grantedBy }: CreateRoleRolePermissionBaseInputs) => {
    try {
        await db.insert(rolePermissions).values({ permissionId, roleId, grantedBy }).$returningId();
        const find = await findRoleOneRolePermission({
            roleId,
            permissionId,
        });
        return find;
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            throw error;
        }
    }
};

export const findRoleOneRolePermission = async ({ roleId, permissionId }: FindRoleRolePermissionField) => {
    try {
        const request = db
            .select({
                roleId: rolePermissions.roleId,
                permissionId: rolePermissions.permissionId,
                grantedAt: rolePermissions.grantedAt,
            })
            .from(rolePermissions)
            .where(whereCondition);

        const result = await request.execute({
            roleId,
            permissionId,
        });

        return result[0];
    } catch (error) {
        return null;
    }
};

export const removeRoleRolePermission = async ({ roleId, permissionId }: FindRoleRolePermissionField) => {
    try {
        const find = findRoleOneRolePermission({ roleId, permissionId });
        if (!find) throw new Error("No found permission for this ressource");

        const request = db.delete(rolePermissions).where(whereCondition).prepare();
        await request.execute({
            roleId,
            permissionId,
        });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            throw error;
        }
    }
};
