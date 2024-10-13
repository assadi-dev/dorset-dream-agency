import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";
import { relations } from "drizzle-orm";
import { photos } from "./photos";

export const variants = mysqlTable("variants", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    description: text("description"),
    type: mysqlEnum("type", ["Location", "Vente"]).notNull(),
    propertyID: int("property_id").references(() => properties.id),
    ...updatedAndCreatedAt,
});

export const variantsRelation = relations(variants, ({ one }) => ({
    property: one(properties, { fields: [variants.propertyID], references: [properties.id] }),
    // photo: one(photos, { fields: [variants.photoID], references: [photos.id] }),
}));
