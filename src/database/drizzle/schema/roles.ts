import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const roles = mysqlTable("grades", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    level: int("level").notNull().unique("level"),
    description: text("description"),
    ...updatedAndCreatedAt,
});

/* export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(gradeRoles),
    rolePermissions: many(rolePermissions),
})); */
