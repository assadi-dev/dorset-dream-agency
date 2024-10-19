import { z } from "zod";

export const propertyOptionSchema = z.object({
    id: z.number(),
    label: z.string(),
    value: z.coerce.string(),
    rentalPrice: z.number(),
    sellingPrice: z.number(),
});
