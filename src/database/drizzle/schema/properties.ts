import { relations } from "drizzle-orm";
import { updatedAndCreatedAt } from "../utils";
import { boolean, int, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { categoryProperties } from "./categoryProperties";
import { variants } from "./variants";

export const properties = mysqlTable("properties", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: text("address"),
    resume: text("resume"),
    description: text("description"),
    factoryPrice: int("factory_price"),
    sellingPrice: int("selling_price"),
    rentalPrice: int("rental_price"),
    isPrestige: boolean("is_prestige").default(false),
    isAvailable: boolean("is_available").default(false),
    isFurnish: boolean("is_furnish").default(false),
    stock: int("stock"),
    categoryID: int("category_id").references(() => categoryProperties.id, { onDelete: "set null" }),
    ...updatedAndCreatedAt,
});

export const propertiesRelation = relations(properties, ({ one, many }) => ({
    category: one(categoryProperties, {
        fields: [properties.categoryID],
        references: [categoryProperties.id],
    }),
    variants: many(variants),
}));
