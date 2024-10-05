import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { updatedAndCreatedAt } from "../utils";

export const photos = mysqlTable("photos", {
    id: int("id").primaryKey(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    size: int("size").notNull(),
    mimeType: varchar("mime_type", { length: 255 }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    ...updatedAndCreatedAt,
});
