import { MAX_LENGTH_MESSAGE, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchema = z.object({
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    resume: z.string().max(250, { message: MAX_LENGTH_MESSAGE }).nullable().optional(),
    description: z.string().nullable(),
    address: z.string().nullable(),
    factoryPrice: z.number().optional().nullable(),
    sellingPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    rentalPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    isFurnish: z.boolean(),
    categoryProperty: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }).or(z.string()),
    isAvailable: z.boolean(),
    stock: z.coerce.number().optional(),
    variants: z.array(z.object({ name: z.string(), files: z.array(z.any()) })),
});

export type propertyFormType = z.infer<typeof propertySchema>;

export const variantSchema = z.object({
    name: z.string().nullable().optional(),
    files: z.array(z.any()).min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type VariantFormType = z.infer<typeof variantSchema>;
