import { ENV } from "@/config/global";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    dbCredentials: {
        host: process.env.MYSQL_DB_HOST_TEST as string,
        user: process.env.MYSQL_DB_USER_TEST as string,
        password: process.env.MYSQL_DB_PASSWORD_TEST as string,
        database: process.env.MYSQL_DB_NAME_TEST as string,
        port: Number(process.env.MYSQL_DB_PORT_TEST),
    },
    verbose: true,
    out: "./src/database/drizzle/__tests__/migrations/",
    schema: "./src/database/drizzle/schema/*.ts",
});
