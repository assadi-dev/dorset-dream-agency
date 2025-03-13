import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { deletedAt, ROLE_ENTITY_ARRAY, updatedAndCreatedAt } from "../utils";
import { relations } from "drizzle-orm";
import { employees } from "./employees";

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    avatar: varchar("avatar", { length: 255 }),
    role: mysqlEnum("role", ROLE_ENTITY_ARRAY).notNull(),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const userRelations = relations(users, ({ one }) => ({
    employees: one(employees),
}));
