import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import z from "zod";
import { zodParserError } from "@/lib/parser";
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
