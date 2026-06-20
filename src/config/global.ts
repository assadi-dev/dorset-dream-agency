import { z } from "zod";

const EnvSchema = z.object({
    APP_TITLE: z.coerce.string().default("Dynasty 8"),
    HOME_PAGE: z.coerce.string().default("/"),
    AUTH_SECRET: z.coerce.string().default("w5FT7zg3TK6IoA5bKwO/8qeFyfBZ7RtMElDJUyOz11g="),
    NEXT_AUTH_SIGN_IN_PAGE: z.coerce.string().default("/connexion"),
    NEXT_AUTH_SIGN_IN_SUCCESS: z.coerce.string().default("/tableau-de-board"),
    NEXT_AUTH_SIGN_OUT_REDIRECT: z.coerce.string().default("/connexion"),
    NEXT_PUBLIC_SIGN_IN_SUCCESS: z.coerce.string().default("/tableau-de-board"),
    MYSQL_DB_HOST: z.coerce.string().default("localhost"),
    MYSQL_DB_USER: z.coerce.string().default("root"),
    MYSQL_DB_PASSWORD: z.coerce.string().default("mysql"),
    MYSQL_DB_NAME: z.coerce.string().default("dynasty8"),
    MYSQL_DB_PORT: z.coerce.string().transform((val) => parseInt(val)).default("3306"),
    DOMAIN: z.coerce.string().default("http://localhost:3000"),
    STORAGE_DIR: z.coerce.string().default("src/storage"),
    SQLITE_DATABASE_URL: z.coerce.string().default("src/database/drizzle/sqlite/sqlite.db"),
    AUTH_DRIZZLE_URL: z.coerce.string().default("src/database/drizzle/sqlite/sqlite.db"),
    OLLAMA_URL: z.coerce.string().default("http://localhost:11434/api"),
    OLLAMA_MODEL: z.coerce.string().default("llama3.1"),
    LM_STUDIO_URL: z.coerce.string().default("http://localhost:1234/api"),
    LM_STUDIO_MODEL: z.coerce.string().default("llama3.1"),
    OPEN_ROUTER_URL: z.coerce.string().default("https://openrouter.ai/api/v1"),
    OPEN_ROUTER_API_KEY: z.coerce.string().default(""),
    OPEN_ROUTER_MODEL: z.coerce.string().default("llama3.1"),
    NTFY_URL: z.coerce.string().default("https://ntfy.sh"),
    NTFY_TOKEN: z.coerce.string().default(""),
    NTFY_MESSAGE_TEMPLATE: z.coerce.string().default(""),
    DEFAULT_LLM__MODEL_PROVIDER: z.coerce.string().default("ollama"),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
export const ENV: EnvSchemaType = EnvSchema.parse(process.env);
ENV.MYSQL_DB_PORT = Number(ENV.MYSQL_DB_PORT);

export const GOOGLE_FONT_URL =
    "https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Cinzel+Decorative:wght@400;700;900&family=Monsieur+La+Doulaise&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
