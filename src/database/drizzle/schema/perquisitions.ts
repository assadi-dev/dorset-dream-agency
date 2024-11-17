import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { clients } from "./client";
import { relations } from "drizzle-orm";
import { employees } from "./employees";
import { perquisitionToPhotos } from "./perquisitionPhotos";

export const perquisitions = mysqlTable("perquisition", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    employeeID: int("employee_id").references(() => employees.id, { onDelete: "cascade" }),
    clientID: int("client_id").references(() => clients.id, { onDelete: "cascade" }),
    ...updatedAndCreatedAt,
});

export const warrantPerquisitionsRelation = relations(perquisitions, ({ one, many }) => ({
    client: one(clients, { fields: [perquisitions.clientID], references: [clients.id] }),
    photos: many(perquisitionToPhotos),
}));
