import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { employeesToSecteurs } from "./employeesToSecteurs";

export const employees = mysqlTable("employees", {
    id: int("id").autoincrement().primaryKey(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    post: mysqlEnum("post", ["Employée", "Manageuse", "Patron", "Employé San Andreas", "Employé îles Galapagos"]),
    iban: varchar("iban", { length: 100 }),
    phone: varchar("phone", { length: 15 }),
    gender: mysqlEnum("gender", ["Male", "Female"]),
    userID: int("user_id").references(() => users.id),
    ...updatedAndCreatedAt,
});

export const employeesRelations = relations(employees, ({ one, many }) => ({
    user: one(users, {
        fields: [employees.userID],
        references: [users.id],
    }),
    secteurs: many(employeesToSecteurs),
}));
