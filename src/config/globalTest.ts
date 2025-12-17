import z from "zod";
import { zodParserError } from "@/lib/parser";
import * as dotenv from "dotenv";
dotenv.config();

//ENVIRONNEMENT DE TEST
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
