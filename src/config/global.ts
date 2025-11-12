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
    DOMAIN: z.coerce.string(),
    STORAGE_DIR: z.coerce.string(),
    SQLITE_DATABASE_URL: z.coerce.string(),
    AUTH_DRIZZLE_URL: z.coerce.string(),
    OLLAMA_URL: z.coerce.string(),
    OLLAMA_MODEL: z.coerce.string(),
    LM_STUDIO_URL: z.coerce.string(),
    LM_STUDIO_MODEL: z.coerce.string(),
    OPEN_ROUTER_URL: z.coerce.string(),
    OPEN_ROUTER_API_KEY: z.coerce.string(),
    OPEN_ROUTER_MODEL: z.coerce.string(),
    NTFY_URL: z.coerce.string(),
    NTFY_TOKEN: z.coerce.string(),
    NTFY_MESSAGE_TEMPLATE: z.coerce.string(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
export const ENV: EnvSchemaType = EnvSchema.parse(process.env);
ENV.MYSQL_DB_PORT = Number(ENV.MYSQL_DB_PORT);

export const GOOGLE_FONT_URL =
    "https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Cinzel+Decorative:wght@400;700;900&family=Monsieur+La+Doulaise&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
