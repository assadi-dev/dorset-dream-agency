import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { categoryProperties } from "./categoryProperties";
import { variants } from "./variants";

export const properties = mysqlTable("properties", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
    purchaseType: mysqlEnum("purchase_type", ["Location", "Vente"]).notNull(),
    factoryPrice: int("factory_price"),
    sellingPrice: int("selling_price"),
    rentalPrice: int("rental_price"),
    keyQuantity: int("key_quantity").default(0),
    keyNumber: varchar("key_number", { length: 50 }),
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
