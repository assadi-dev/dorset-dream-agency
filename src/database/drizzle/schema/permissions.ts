import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { ACTIONS } from "@/lib/rbac/constants";
import { rolePermissions } from "./rolePermissions";

export const permissions = mysqlTable("permissions", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    ressource: varchar("ressource", { length: 50 }).notNull(), //Entity: properties,users,etc
    action: varchar("action", { length: 100 }).notNull(), //Actions : read,create, update,delete
    ...updatedAndCreatedAt,
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
    rolePermissions: many(rolePermissions),
}));
