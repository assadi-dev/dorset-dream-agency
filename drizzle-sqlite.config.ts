import { ENV } from "@/config/global";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    dbCredentials: {
        url: ENV.SQLITE_DATABASE_URL,
    },
    verbose: true,
    out: "./src/database/drizzle/sqlite/migrations",
    schema: "./src/database/drizzle/sqlite/schema/*.ts",
});
