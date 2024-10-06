import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { categoryProperties, typeProperties } from "./categoryProperties";
import { variants } from "./variants";

export const properties = mysqlTable("properties", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
    purchaseType: mysqlEnum("purchase_type", ["Location", "Vente"]).notNull(),
    factoryPrice: int("factory_price"),
    sellingPrice: int("selling_price"),
    rentalPrice: int("rental_price"),
    numberOfKey: int("number_of_key").default(0),
    propertyKey: varchar("property_key", { length: 50 }),
    isPrestige: boolean("is_prestige").default(false),
    isAvailable: boolean("is_available").default(false),
    isFurnish: boolean("is_furnish").default(false),
    categoryID: int("category_id").references(() => categoryProperties.id),
    ...updatedAndCreatedAt,
});

export const propertiesRelation = relations(properties, ({ one, many }) => ({
    categoryProperties: one(categoryProperties, {
        fields: [properties.categoryID],
        references: [categoryProperties.id],
    }),
    variants: many(variants),
}));
