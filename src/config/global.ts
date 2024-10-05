import { z } from "zod";

const EnvSchema = z.object({
    APP_TITLE: z.coerce.string(),
    HOME_PAGE: z.coerce.string(),
    AUTH_SECRET: z.coerce.string(),
    NEXT_AUTH_SIGN_IN_PAGE: z.coerce.string(),
    NEXT_AUTH_SIGN_IN_SUCCESS: z.coerce.string(),
    NEXT_AUTH_SIGN_OUT_REDIRECT: z.coerce.string(),
    NEXT_PUBLIC_SIGN_IN_SUCCESS: z.coerce.string(),
    MYSQL_DB_HOST: z.coerce.string(),
    MYSQL_DB_USER: z.coerce.string(),
    MYSQL_DB_PASSWORD: z.coerce.string(),
    MYSQL_DB_NAME: z.coerce.string(),
    MYSQL_DB_PORT: z.coerce.string().transform((val) => parseInt(val)),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
export const ENV: EnvSchemaType = EnvSchema.parse(process.env);
ENV.MYSQL_DB_PORT = Number(ENV.MYSQL_DB_PORT);
