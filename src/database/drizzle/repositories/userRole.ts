import { db } from "@/database";
import { userRoles } from "../schema/userRoles";
import {
    CreateUserRoleInputs,
    UpdateUserRoleInputs,
    userRoleParsed,
    userRoleSchema,
    UserRoleSelectRequest,
} from "./dto/userRoleDTO";
import { and, eq, sql } from "drizzle-orm";
import { reportException } from "@/lib/logger";
import { roles } from "../schema/roles";
import { users } from "../schema/users";
import { employees } from "../schema/employees";

const whereCondition = and(
    eq(userRoles.roleId, sql.placeholder("roleId")),
    eq(userRoles.userId, sql.placeholder("userId")),
);

export const insertUserRole = async (values: CreateUserRoleInputs) => {
    try {
        await db.insert(userRoles).values(values);
        return findOneUserRole({ userId: values.userId, roleId: values.roleId });
    } catch (error) {
        if (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    }
};

export const updateUserRole = async (values: UpdateUserRoleInputs) => {
    try {
        const validateParams = userRoleSchema.safeParse(values);
        if (validateParams.error) throw validateParams.error;
        const findUserRoleAssigned = findOneUserRole({
            userId: validateParams.data.userId,
            roleId: validateParams.data.roleId,
        });
        if (!findUserRoleAssigned) throw Error("for this user not Found");
        const updateValues = {
            roleId: values.newRoleId,
            assignedBy: values.assignedBy,
        };
        const request = db.update(userRoles).set(updateValues).where(whereCondition).prepare();
        await request.execute({
            userId: values.userId,
            roleId: values.roleId,
        });
        return findOneUserRole({ userId: values.userId as number, roleId: values.newRoleId });
    } catch (error) {
        if (error) {
            throw error;
        }
    }
};

export const findOneUserRole = async ({ userId, roleId }: { userId: number; roleId: number }) => {
    try {
        const request = db
            .select({
                roleId: userRoles.roleId,
                userId: userRoles.userId,
                assignedAt: userRoles.assignedAt,
                assignedBy: userRoles.assignedBy,
            })
            .from(userRoles)
            .where(whereCondition)
            .prepare();
        const result = await request.execute({
            userId,
            roleId,
        });
        return result[0];
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
        }
        return null;
    }
};

export const findOneUserRoleFull = async ({ userId, roleId }: { userId: number; roleId: number }) => {
    try {
        const request = db
            .select({
                roleId: roles.id,
                roleName: roles.name,
                roleDisplayName: roles.displayName,
                userId: users.id,
                username: users.username,
                userFullName: sql<string>`CONCAT(${employees.firstName}," ",${employees.lastName})`,
                assignedById: users.id,
                assignedByUsername: users.username,
                assignedByFullName: sql<string>`CONCAT(${employees.firstName}," ",${employees.lastName})`,
                assignedAt: userRoles.assignedAt,
            })
            .from(userRoles)
            .where(whereCondition)
            .prepare();
        const result = await request.execute({
            userId,
            roleId,
        });

        return result.map((role: unknown) => userRoleParsed(role as UserRoleSelectRequest));
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
        }
        return null;
    }
};

export const assigneRoleToUser = async (values: UpdateUserRoleInputs) => {
    try {
        const validateParams = userRoleSchema.safeParse(values);
        if (validateParams.error) throw validateParams.error;
        const findUserRoleAssigned = await findOneUserRole({
            userId: validateParams.data.userId,
            roleId: validateParams.data.roleId,
        });

        if (findUserRoleAssigned?.assignedAt) {
            return updateUserRole(values);
        }

        return insertUserRole({
            userId: validateParams.data.userId,
            roleId: validateParams.data.roleId,
            assignedBy: validateParams.data.assignedBy || null,
        });
    } catch (error) {
        throw error;
    }

    //reportLogAction()
};

export const assignMultipleUser = async (values: UpdateUserRoleInputs[]) => {
    for (const value of values) {
        try {
            await assigneRoleToUser(value);
        } catch (error) {
            if (error instanceof Error) {
                reportException(error);
            }
            continue;
        }
    }
};

export const reportLogAction = () => {};
