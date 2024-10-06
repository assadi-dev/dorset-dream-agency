import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { clients } from "./client";
import { employees } from "./employees";
import { properties } from "./properties";
import { relations } from "drizzle-orm";

export const transactions = mysqlTable("transactions", {
    id: serial("id").primaryKey(),
    clientID: int("client_id").references(() => clients.id),
    employeeID: int("employee_id").references(() => employees.id),
    propertyID: int("property_id").references(() => properties.id),
    sellingPrice: int("selling_price"),
    marginPrice: int("margin_price"),
    purchaseType: mysqlEnum("purchase_type", ["Location", "Vente"]),
    propertyService: mysqlEnum("property_service", ["Location LS", "Location Iles", "Ventes LS", "Vente Iles"]),
    ...updatedAndCreatedAt,
});

export const transactionsRelation = relations(transactions, ({ one }) => ({
    client: one(clients, { fields: [transactions.clientID], references: [clients.id] }),
    employee: one(employees, { fields: [transactions.employeeID], references: [employees.id] }),
    property: one(properties, { fields: [transactions.propertyID], references: [properties.id] }),
}));
