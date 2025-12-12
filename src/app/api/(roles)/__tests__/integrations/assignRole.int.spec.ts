import { db } from "~/vitest.setup";
import { SALT_ROUNDS } from "@/config/security";
import { beforeAll, describe, it } from "vitest";
import bcrypt from "bcrypt";
import { users } from "@/database/drizzle/schema/users";

let userId: number;
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

export const generateRole = async (inputs: { username: string; password: string }) => {
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

describe("Assign Role Integration", () => {
    beforeAll(async () => {
        // création d'un user de test
        await generateUser({ username: "johndoe@test.com", password: "password@123" });
    });
    describe("Assign  user without role", () => {
        it("Should be have a ", async () => {});
    });

    // describe("ReAssigne  user",()=>{})
});
