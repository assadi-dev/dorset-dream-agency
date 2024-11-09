import { z } from "zod";

export const propertyInfoSchema = z.object({
    rentalPrice: z.number().optional(),
    sellingPrice: z.number().optional(),
    isAvailable: z.boolean().optional(),
    isFurnish: z.boolean().optional(),
    stock: z.number().nullable().optional(),
});

export const galleryObjectSchema = z.object({
    id: z.number(),
    url: z.string(),
    originalName: z.string(),
    size: z.number(),
    type: z.string(),
});

export type PropertyInfoType = z.infer<typeof propertyInfoSchema>;
export type GalleryObjectType = z.infer<typeof galleryObjectSchema>;

export const extractDataForInfo = {
    propertyInfo: (values: any) => propertyInfoSchema.parse(values),
    galleryObject: (values: any) => galleryObjectSchema.parse(values),
};
