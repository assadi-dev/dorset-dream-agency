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
    out: "./src/database/drizzle/migrations",
    schema: "./src/database/drizzle/schema/*.ts",
});

/* export default defineConfig({
    dialect: "sqlite",
    dbCredentials: {
        url: ENV.SQLITE_DATABASE_URL,
    },
    verbose: true,
    out: "./src/database/drizzle/sqlite/migrations",
    schema: "./src/database/drizzle/sqlite/schema/*.ts",
});
 */
