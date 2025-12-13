import { SALT_ROUNDS } from "@/config/security";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import bcrypt from "bcrypt";
import { users } from "@/database/drizzle/schema/users";
import { roles } from "@/database/drizzle/schema/roles";
import { eq } from "drizzle-orm";
import { PATCH as assignRole } from "../../roles/assign/route";
import { NextRequest } from "next/server";
import { db } from "~/vitest.setup";

let userId: number;
let roleId: number;
export const generateUser = async (inputs: { username: string; password: string }) => {
    const { password, username } = inputs;
    const exist = await db.select().from(users).where(eq(users.username, username));
    if (exist[0]) {
        userId = exist[0].id;
        return;
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
    userId = request[0].id;
};

export const generateRole = async (inputs: { name: string; displayName: string; level: number }) => {
    const { name, displayName, level } = inputs;

    const exist = await db.select().from(roles).where(eq(roles.name, name));
    if (exist[0]) {
        roleId = exist[0].id;
        return;
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
    roleId = request[0].id;
};

function mockRequest(body: any) {
    return new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

describe("API Assign Role Integration", () => {
    beforeAll(async () => {
        // création d'un user de test
        await generateUser({ username: "johndoe@test.com", password: "password@123" });
        // création des role de test
        await generateRole({ name: "moderator", displayName: "Modérateur", level: 100 });
        await generateRole({ name: "helper", displayName: "Support technique", level: 99 });
    });
    describe("Assign  user without role", () => {
        it("Should be have a role moderator and status 200", async () => {
            const assignReq = mockRequest({ users: [userId], roleId });
            const assignRes = await assignRole(assignReq);

            const json = await assignRes?.json();

            expect(assignRes?.status).toBe(200);
            expect(json).toHaveProperty("message");
            expect(json.message).toEqual("role assigned");
        });
    });

    // describe("ReAssigne  user",()=>{})

    afterAll(async () => {
        db.delete(users).where(eq(users.id, userId));
        db.delete(roles).where(eq(roles.id, roleId));
    });
});
