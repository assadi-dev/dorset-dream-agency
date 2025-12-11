import { relations } from "drizzle-orm";
import { deletedAt, EMPLOYEE_POST, updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { employeesToSecteurs } from "./employeesToSecteurs";
import { photos } from "./photos";
import { announcements } from "./announcements";
import { grades } from "./grades";

export const employees = mysqlTable("employees", {
    id: int("id").autoincrement().primaryKey(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    iban: varchar("iban", { length: 100 }),
    phone: varchar("phone", { length: 15 }),
    gender: mysqlEnum("gender", ["Male", "Female"]),
    userID: int("user_id").references(() => users.id, { onDelete: "set null" }),
    photoID: int("photo_id").references(() => photos.id, { onDelete: "set null" }),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const employeesRelations = relations(employees, ({ one, many }) => ({
    user: one(users, {
        fields: [employees.userID],
        references: [users.id],
    }),
    secteurs: many(employeesToSecteurs),
    photo: one(photos),
    announcements: many(announcements),
    grade: one(grades),
}));
