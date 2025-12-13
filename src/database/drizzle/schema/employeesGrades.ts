import { datetime, int, mysqlTable } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { grades } from "./grades";
import { relations } from "drizzle-orm";

export const employeesGrades = mysqlTable("employee_grade", {
    employeeId: int("employee_id")
        .notNull()
        .references(() => employees.id, { onDelete: "cascade" }),
    gradeId: int("grade_id")
        .notNull()
        .references(() => grades.id, { onDelete: "cascade" }),
    assignedAt: datetime("assigned_at")
        .$default(() => new Date())
        .notNull(),
    assignedBy: int("assigned_by").references(() => employees.id, { onDelete: "cascade" }),
});

export const employeesGradesRelation = relations(employeesGrades, ({ one }) => ({
    user: one(employees, {
        fields: [employeesGrades.employeeId],
        references: [employees.id],
    }),
    role: one(grades, {
        fields: [employeesGrades.gradeId],
        references: [grades.id],
    }),
    assignedByUser: one(employees, {
        fields: [employeesGrades.employeeId],
        references: [employees.id],
    }),
}));
