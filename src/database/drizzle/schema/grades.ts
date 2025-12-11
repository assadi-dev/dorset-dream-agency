import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { employeesGrades } from "./employeesGrades";

export const grades = mysqlTable("grades", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const gradesRelations = relations(grades, ({ many }) => ({
    employees: many(employeesGrades),
}));
