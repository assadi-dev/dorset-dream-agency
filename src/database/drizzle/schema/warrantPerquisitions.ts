import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { clients } from "./client";
import { relations } from "drizzle-orm";
import { warrantPerquisitionToPhotos } from "./warrantPerquisitionToPhotos";

export const warrantPerquisitions = mysqlTable("warrantPerquisition", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    clientID: int("property_id").references(() => clients.id, { onDelete: "cascade" }),
    ...updatedAndCreatedAt,
});

export const warrantPerquisitionsRelation = relations(warrantPerquisitions, ({ one, many }) => ({
    client: one(clients, { fields: [warrantPerquisitions.clientID], references: [clients.id] }),
    photos: many(warrantPerquisitionToPhotos),
}));
