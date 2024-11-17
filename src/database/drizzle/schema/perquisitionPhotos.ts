import { foreignKey, index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { photos } from "./photos";
import { perquisitions } from "./perquisitions";

export const perquisitionToPhotos = mysqlTable(
    "perquisition_to_photos",
    {
        perquisitionID: int("perquisition_id").references(() => perquisitions.id, {
            onDelete: "cascade",
        }),
        photoID: int("photo_id").references(() => photos.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.perquisitionID, t.photoID], name: "perquisitions_photos_pk" }),
        perquisitionIdx: index("perquisition_idx").on(t.perquisitionID),
        photsIdx: index("photos_idx").on(t.photoID),
    }),
);

export const perquisitionToPhotosRelation = relations(perquisitionToPhotos, ({ one }) => {
    return {
        warrantPerquisition: one(perquisitions, {
            fields: [perquisitionToPhotos.perquisitionID],
            references: [perquisitions.id],
        }),
        photo: one(photos, {
            fields: [perquisitionToPhotos.photoID],
            references: [photos.id],
        }),
    };
});
