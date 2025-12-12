import { SALT_ROUNDS } from "@/config/security";
import { afterAll, beforeAll, describe, it } from "vitest";
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
    /**
     * Mot de passe crypté
     */
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

export const generateRole = async (inputs: { name: string; displayName: string }) => {
    const { name, displayName } = inputs;

    const request = await db
        .insert(roles)
        .values({
            name: name,
            displayName: displayName,
            description: `role description`,
            level: 100,
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
        await generateRole({ name: "moderator", displayName: "Modérateur" });
        await generateRole({ name: "helper", displayName: "Support technique" });
    });
    describe("Assign  user without role", () => {
        it("Should be have a role moderator and status 200", async () => {
            const assignReq = mockRequest({ users: [userId], roleId });
            const assignRes = await assignRole(assignReq);
        });
    });

    // describe("ReAssigne  user",()=>{})

    afterAll(async () => {
        db.delete(users).where(eq(users.id, userId));
        db.delete(roles).where(eq(roles.id, roleId));
    });
});
