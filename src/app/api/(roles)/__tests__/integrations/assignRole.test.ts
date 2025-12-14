import { SALT_ROUNDS } from "@/config/security";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";
import { users } from "@/database/drizzle/schema/users";
import { roles } from "@/database/drizzle/schema/roles";
import { and, eq, inArray } from "drizzle-orm";
import { PATCH as assignRole } from "../../roles/assign/route";
import { NextRequest } from "next/server";
import { db } from "~/vitest.setup";
import { userRoles } from "@/database/drizzle/schema/userRoles";
import { findOneUserRole, insertUserRole } from "@/database/drizzle/repositories/userRole";
import { AssignRequestBodyInfer } from "../../schema";
import { ROLE_MOCK_DATA } from "@/mocks/actionsPermissionGranted";
import { USERS_MOCK_DATA } from "@/mocks/usersMock";

const userIds: number[] = [];
const roleIds: number[] = [];
export const generateUser = async (inputs: { username: string; password: string }) => {
    const { password, username } = inputs;
    const exist = await db.select().from(users).where(eq(users.username, username));
    if (exist[0]) {
        return exist[0].id;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const request = await db
        .insert(users)
        .values({
            username: username,
            password: hashedPassword,
            role: "user",
        })
        .$returningId();
    return request[0].id;
};

export const generateRole = async (inputs: { name: string; displayName: string; level: number }) => {
    const { name, displayName, level } = inputs;

    const exist = await db.select().from(roles).where(eq(roles.name, name));
    if (exist[0]) {
        return exist[0].id;
    }

    const request = await db
        .insert(roles)
        .values({
            name: name,
            displayName: displayName,
            description: `role description`,
            level,
        })
        .$returningId();
    return request[0].id;
};

function mockRequest(body: AssignRequestBodyInfer) {
    return new NextRequest("http://localhost", {
        method: "PATCH",
        body: JSON.stringify(body),
    });
}

const cleanDatabase = async () => {
    await db.delete(users).where(inArray(users.id, userIds));
    await db.delete(roles).where(inArray(roles.id, roleIds));
    await db.delete(userRoles);
};

describe("API Assign Role Integration", () => {
    beforeAll(async () => {
        // création des role de test
        const roleId = await generateRole(ROLE_MOCK_DATA[0]);
        const newRoleId = await generateRole(ROLE_MOCK_DATA[1]);
        roleIds.push(roleId);
        roleIds.push(newRoleId);
    });

    beforeEach(async () => {
        vi.clearAllMocks();
    });
    describe("Assign  user without role and without assigner", async () => {
        it("Should be have assignedAt and status 200", async () => {
            const userId = await generateUser(USERS_MOCK_DATA[0]);
            const newRoleId = userId;
            userIds.push(userId);
            const users = [userIds[0]];
            const roleId = roleIds[0];
            const assignReq = mockRequest({ users, roleId, newRoleId });
            const assignRes = await assignRole(assignReq);

            const json = await assignRes?.json();

            expect(assignRes?.status).toBe(200);
            expect(json).toHaveProperty("message");
            expect(json).toHaveProperty("rows");
            expect(json.message).toEqual("role assigned");
            //check in database
            const resultDb = await findOneUserRole({ roleId, userId });
            expect(resultDb?.assignedAt).toBeDefined();
        });

        it("Should be have assignedBy and status 200", async () => {
            const userId = await generateUser(USERS_MOCK_DATA[1]);
            userIds.push(userId);
            const users = [userIds[1]];
            const roleId = roleIds[0];
            const newRoleId = roleId;
            const assignReq = mockRequest({ users, roleId, newRoleId, assignerId: 1 });
            const assignRes = await assignRole(assignReq);

            const json = await assignRes?.json();

            expect(assignRes?.status).toBe(200);
            expect(json).toHaveProperty("message");
            expect(json).toHaveProperty("rows");
            expect(json.message).toEqual("role assigned");
            //connect db
            const resultDb = await findOneUserRole({ roleId: newRoleId, userId });
            expect(resultDb?.assignedAt).toBeDefined();
            expect(resultDb?.assignedBy).toEqual(1);
        });
    });

    describe("Reassign new Role to user", () => {
        it("Role  should be different to older for the user", async () => {
            const userId = userIds[1];
            const roleId = roleIds[0];

            const users = [userId];
            const newRoleId = roleIds[1];

            const assignReq = mockRequest({ users, roleId, newRoleId, assignerId: 1 });
            const assignRes = await assignRole(assignReq);
            const json = await assignRes?.json();
            expect(assignRes?.status).toBe(200);
            expect(json).toHaveProperty("message");
            expect(json).toHaveProperty("rows");
            expect(json.message).toEqual("role assigned");
            const findUserRole = await findOneUserRole({ roleId: newRoleId, userId });
            expect(findUserRole?.roleId).not.toEqual(roleId);
        });
    });

    describe("Unique user key by role", () => {
        it("Should be include Duplicate entry in error message", async () => {
            const userId = userIds[1];
            const roleId = roleIds[0];
            try {
                await insertUserRole({ userId, roleId, assignedBy: 1 });
            } catch (error) {
                if (error instanceof Error) {
                    expect(error.message).toContain("Duplicate entry");
                }
            }
        });
    });
    afterAll(async () => {
        await cleanDatabase();
    });
});
