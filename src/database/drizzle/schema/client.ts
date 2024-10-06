import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { transactions } from "./transactions";

export const clients = mysqlTable("clients", {
    id: int("id").autoincrement().primaryKey(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    gender: mysqlEnum("gender", ["Male", "Female"]),
    phone: varchar("phone", { length: 15 }),
    ...updatedAndCreatedAt,
});

export const clientsRelations = relations(clients, ({ many }) => ({
    transactions: many(transactions),
}));
