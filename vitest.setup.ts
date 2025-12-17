import { vi } from "vitest";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import z from "zod";
import { zodParserError } from "@/lib/parser";
import { UserAdapter } from "@/auth";
import { ENV_TEST } from "@/config/global";
config();

const client = createPool({
    host: ENV_TEST.MYSQL_DB_HOST_TEST,
    user: ENV_TEST.MYSQL_DB_USER_TEST,
    password: ENV_TEST.MYSQL_DB_PASSWORD_TEST,
    database: ENV_TEST.MYSQL_DB_NAME_TEST,
    port: ENV_TEST.MYSQL_DB_PORT_TEST,
});
export const db = drizzle(client);

vi.mock("@/database", async () => {
    return {
        db: drizzle(client),
    };
});
/* const userSessionMock = {
    id: "13",
    name: "john Doe",
    email: "johndoe@gmail.com",
    image: "",
    role: "admin",
    employeeID: 13,
    grade: "Patron",
} satisfies UserAdapter;

vi.mock("next-auth", async () => {
    return {
        default: vi.fn(() => ({
            handlers: { GET: vi.fn(), POST: vi.fn() },
            signIn: vi.fn(),
            signOut: vi.fn(),
            auth: vi.fn(() => ({
                user: userSessionMock,
                expires: "1",
            })),
            unstable_update: vi.fn(),
        })),
        // Export the properties that are destructured from NextAuth
        handlers: { GET: vi.fn(), POST: vi.fn() },
        signIn: vi.fn(),
        signOut: vi.fn(),
        auth: vi.fn(() => ({
            user: userSessionMock,
            expires: "1",
        })),
        unstable_update: vi.fn(),
    };
});
 */
