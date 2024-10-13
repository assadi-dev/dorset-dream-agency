import { updatedAndCreatedAt } from "../utils";
import { int, mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { properties } from "./properties";
import { relations } from "drizzle-orm";
import { galleryVariants } from "./galleryVariant";

export const variants = mysqlTable("variants", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    description: text("description"),
    propertyID: int("property_id").references(() => properties.id),
    ...updatedAndCreatedAt,
});

export const variantsRelation = relations(variants, ({ one, many }) => ({
    property: one(properties, { fields: [variants.propertyID], references: [properties.id] }),
    photos: many(galleryVariants),
}));
