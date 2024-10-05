import { int, mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { updatedAndCreatedAt } from "../utils";

export const photos = mysqlTable("photos", {
    id: serial("id").primaryKey(),
    originalName: varchar("original_name", { length: 255 }),
    size: int("size"),
    mimeType: varchar("mime_type", { length: 255 }),
    url: varchar("url", { length: 255 }),
    ...updatedAndCreatedAt,
});
