import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { photos } from "./photos";
import { variants } from "./variants";
import { relations } from "drizzle-orm";

export const galleryVariants = mysqlTable(
    "gallery_variants",
    {
        photoID: int("photo_id").references(() => photos.id, { onDelete: "cascade" }),
        variantID: int("variant_id").references(() => variants.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.photoID, t.variantID] }),
        photoIDX: index("photo_idx").on(t.photoID),
        variantIDX: index("variant_idx").on(t.variantID),
    }),
);

export const variantToGalleryVariantsRelation = relations(galleryVariants, ({ one }) => {
    return {
        photo: one(photos, {
            fields: [galleryVariants.photoID],
            references: [photos.id],
        }),
        variant: one(variants, {
            fields: [galleryVariants.variantID],
            references: [variants.id],
        }),
    };
});
