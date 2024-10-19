import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { clients } from "./client";
import { employees } from "./employees";
import { properties } from "./properties";
import { relations } from "drizzle-orm";

export const transactions = mysqlTable("transactions", {
    id: int("id").autoincrement().primaryKey(),
    clientID: int("client_id").references(() => clients.id),
    employeeID: int("employee_id").references(() => employees.id),
    propertyID: int("property_id").references(() => properties.id),
    sellingPrice: int("selling_price"),
    keyQuantity: int("key_quantity").default(0),
    keyNumber: varchar("key_number", { length: 100 }),
    propertyService: mysqlEnum("property_service", ["Location LS", "Location Iles", "Ventes LS", "Vente Iles"]),
    ...updatedAndCreatedAt,
});

export const transactionsRelation = relations(transactions, ({ one }) => ({
    client: one(clients, { fields: [transactions.clientID], references: [clients.id] }),
    employee: one(employees, { fields: [transactions.employeeID], references: [employees.id] }),
    property: one(properties, { fields: [transactions.propertyID], references: [properties.id] }),
}));
