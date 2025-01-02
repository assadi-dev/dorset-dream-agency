import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { deletedAt, updatedAndCreatedAt } from "../utils";

export const files = mysqlTable("files", {
    id: int("id").autoincrement().primaryKey(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    size: int("size").notNull(),
    mimeType: varchar("mime_type", { length: 255 }).notNull(),
    path: varchar("path", { length: 255 }).notNull(),
    ...updatedAndCreatedAt,
    ...deletedAt,
});
