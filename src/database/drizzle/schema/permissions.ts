import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { rolePermissions } from "./rolePermissions";

export const permissions = mysqlTable("permissions", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    description: text("description"),
    resource: varchar("resource", { length: 50 }).notNull(), //Entity: properties,users,etc
    action: varchar("action", { length: 100 }).notNull(), //Actions : read,create, update,delete
    ...updatedAndCreatedAt,
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
    rolePermissions: many(rolePermissions),
}));
