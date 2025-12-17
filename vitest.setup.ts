import { vi } from "vitest";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import z from "zod";
import { zodParserError } from "@/lib/parser";
import { User } from "next-auth";
import { UserAdapter, UserSession } from "@/auth";
config();

export const envTestSchema = z.object({
    MYSQL_DB_HOST_TEST: z.coerce.string(),
    MYSQL_DB_PORT_TEST: z.coerce.number(),
    MYSQL_DB_USER_TEST: z.coerce.string(),
    MYSQL_DB_PASSWORD_TEST: z.coerce.string(),
    MYSQL_DB_NAME_TEST: z.coerce.string(),
    EMAIL_DNS: z.coerce.string(),
    PHONE_COUNTRY_CODE: z.coerce.string(),
});

const envParseResult = envTestSchema.safeParse(process.env);
if (envParseResult.error) throw zodParserError(envParseResult.error);
export const ENV_TEST = envParseResult.data;

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
const userSessionMock = {
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
