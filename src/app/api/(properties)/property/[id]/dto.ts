import { z } from "zod";

export const categorySchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
});
export const propertyResponseSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    category: z.object({
        id: z.coerce.number(),
        name: z.string(),
    }),
    sellingPrice: z.coerce.number(),
    rentalPrice: z.coerce.number(),
    stock: z.coerce.number(),
    variants: z.array(z.any()),
    createdAt: z.string(),
});
