import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userActions = sqliteTable("user_action", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    user: text("user", { mode: "text", length: 50 }).notNull(),
    grade: text("grade", { mode: "text", length: 50 }),
    action: text("action", { enum: ["create", "update", "delete", "restore"], length: 50 }),
    name: text("name", { mode: "text", length: 50 }).notNull(),
    description: text("description", { mode: "json" }),
    timestamp: integer("timestamp", { mode: "timestamp" }).default(sql<string>`(CURRENT_TIMESTAMP)`),
});
