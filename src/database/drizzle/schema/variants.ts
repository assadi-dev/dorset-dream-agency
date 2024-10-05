import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";
import { relations } from "drizzle-orm";

export const transactions = mysqlTable("transactions", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    description: varchar("name", { length: 255 }),
    type: mysqlEnum("type", ["Location", "Vente"]).notNull(),
    propertyID: int("property_id").references(() => properties.id),
    ...updatedAndCreatedAt,
});

export const transactionsRelation = relations(transactions, ({ one }) => ({
    property: one(properties, { fields: [transactions.propertyID], references: [properties.id] }),
}));
