import { relations } from "drizzle-orm";
import { deletedAt, updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { photos } from "./photos";

export const decoratorProfiles = mysqlTable("decorator_profiles", {
    id: int("id").autoincrement().primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    yearOfExperience: int("year_of_experience").notNull(),
    speciality: varchar("speciality", { length: 255 }).notNull(),
    averageCreationTime: int("average_creation_time").notNull(),
    photoID: int("photo_id").references(() => photos.id, { onDelete: "set null" }),
    ...updatedAndCreatedAt,
    ...deletedAt,
});

export const decoratorProfilesRelations = relations(decoratorProfiles, ({ one }) => ({
    photo: one(photos, {
        fields: [decoratorProfiles.photoID],
        references: [photos.id],
    }),
}));

