import { deletedAt, updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { clients } from "./client";
import { employees } from "./employees";
import { relations } from "drizzle-orm";
import { variants } from "./variants";

export const transactions = mysqlTable("transactions", {
    id: int("id").autoincrement().primaryKey(),
    clientID: int("client_id").references(() => clients.id),
    employeeID: int("employee_id").references(() => employees.id),
    variantID: int("variant_id").references(() => variants.id),
    sellingPrice: int("selling_price"),
    keyQuantity: int("key_quantity").default(0),
    keyNumber: varchar("key_number", { length: 100 }),
    propertyService: mysqlEnum("property_service", ["Location LS", "Location Favelas", "Ventes LS", "Ventes Favelas"]),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const transactionsRelation = relations(transactions, ({ one }) => ({
    client: one(clients, { fields: [transactions.clientID], references: [clients.id] }),
    employee: one(employees, { fields: [transactions.employeeID], references: [employees.id] }),
    property: one(variants, { fields: [transactions.variantID], references: [variants.id] }),
}));
