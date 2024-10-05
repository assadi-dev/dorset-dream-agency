import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const clients = mysqlTable("clients", {
    id: int("id").primaryKey(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    gender: mysqlEnum("gender", ["Male", "Female"]),
    phone: varchar("phone", { length: 15 }),
    ...updatedAndCreatedAt,
});
