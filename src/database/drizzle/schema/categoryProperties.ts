import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";

export const categoryProperties = mysqlTable("categoryProperties", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    ...updatedAndCreatedAt,
});

export const typePropertiesRelations = relations(categoryProperties, ({ many }) => ({
    properties: many(properties),
}));
