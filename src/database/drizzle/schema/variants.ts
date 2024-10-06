import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";
import { relations } from "drizzle-orm";
import { photos } from "./photos";

export const variants = mysqlTable("variants", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    description: varchar("description", { length: 255 }),
    type: mysqlEnum("type", ["Location", "Vente"]).notNull(),
    propertyID: int("property_id").references(() => properties.id),
    photoID: int("photo_id").references(() => photos.id),
    ...updatedAndCreatedAt,
});

export const variantsRelation = relations(variants, ({ one }) => ({
    property: one(properties, { fields: [variants.propertyID], references: [properties.id] }),
    photo: one(photos, { fields: [variants.photoID], references: [photos.id] }),
}));
