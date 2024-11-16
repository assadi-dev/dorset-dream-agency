import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { warrantPerquisitions } from "./warrantPerquisitions";
import { relations } from "drizzle-orm";
import { photos } from "./photos";

export const warrantPerquisitionToPhotos = mysqlTable(
    "warrantPerquisitions_to_photos",
    {
        warrantPerquisitionID: int("warrantPerquisition_id")
            .notNull()
            .references(() => warrantPerquisitions.id, { onDelete: "cascade" }),
        photoID: int("photo_id")
            .notNull()
            .references(() => warrantPerquisitions.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.warrantPerquisitionID, t.photoID] }),
        warrantPerquisitionIdx: index("warrantPerquisition_idx").on(t.warrantPerquisitionID),
        photsIdx: index("photos_idx").on(t.photoID),
    }),
);

export const warrantPerquisitionToPhotosRelation = relations(warrantPerquisitionToPhotos, ({ one }) => ({
    warrantPerquisition: one(warrantPerquisitions, {
        fields: [warrantPerquisitionToPhotos.warrantPerquisitionID],
        references: [warrantPerquisitions.id],
    }),
    photo: one(photos, { fields: [warrantPerquisitionToPhotos.photoID], references: [photos.id] }),
}));
