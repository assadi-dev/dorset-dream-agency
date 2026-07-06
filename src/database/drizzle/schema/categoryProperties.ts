import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";

export const categoryProperties = mysqlTable("category_properties", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    isVisible: boolean("is_visible").default(true),
    ...updatedAndCreatedAt,
});

export const typePropertiesRelations = relations(categoryProperties, ({ many }) => ({
    properties: many(properties),
}));
