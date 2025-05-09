import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { transactions } from "./transactions";

export const clients = mysqlTable("clients", {
    id: int("id").autoincrement().primaryKey(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    gender: mysqlEnum("gender", ["Male", "Female"]),
    phone: varchar("phone", { length: 15 }),
    isDead: boolean("is_dead"),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const clientsRelations = relations(clients, ({ many }) => ({
    transactions: many(transactions),
}));
