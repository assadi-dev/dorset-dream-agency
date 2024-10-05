import { ENV } from "@/config/global";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    dbCredentials: {
        host: ENV.MYSQL_DB_HOST,
        user: ENV.MYSQL_DB_USER,
        database: ENV.MYSQL_DB_NAME,
        password: ENV.MYSQL_DB_PASSWORD,
        port: ENV.MYSQL_DB_PORT,
    },
    verbose: true,
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema/*",
});
