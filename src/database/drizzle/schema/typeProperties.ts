import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";

export const typeProperties = mysqlTable("type_properties", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    ...updatedAndCreatedAt,
});

export const typePropertiesRelations = relations(typeProperties, ({ many }) => ({
    properties: many(properties),
}));
