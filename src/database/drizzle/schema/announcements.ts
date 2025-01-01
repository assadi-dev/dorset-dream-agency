import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const announcements = mysqlTable("clients", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 250 }).notNull(),
    description: text("description"),
    path: varchar("path", { length: 255 }),
    settings: varchar("settings", { length: 255 }),
    author: int("author").references(() => employees.id, { onDelete: "set null" }),
    isPublish: boolean("is_publish"),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const announcementsRelation = relations(announcements, ({ one }) => ({
    author: one(employees),
}));
