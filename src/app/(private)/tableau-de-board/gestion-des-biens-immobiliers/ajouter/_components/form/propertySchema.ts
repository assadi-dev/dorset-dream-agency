import { MAX_LENGTH_MESSAGE, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchema = z.object({
    id: z.number().nullable().optional(),
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    resume: z.string().max(250, { message: MAX_LENGTH_MESSAGE }).nullable().optional(),
    description: z.string().nullable(),
    address: z.string().nullable(),
    factoryPrice: z.number().optional().nullable(),
    sellingPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    rentalPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    isFurnish: z.boolean(),
    categoryProperty: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }).or(z.string()).optional().nullable(),
    isAvailable: z.boolean(),
    stock: z.coerce.number().optional(),
    typeStock: z.coerce.number(),
    variants: z.array(
        z.object({
            id: z.coerce.number().or(z.string()).optional().nullable(),
            name: z.string().nullable().optional(),
            files: z.array(z.any()).nullable().optional(),
            url: z.string().nullable().optional(),
            toRemove: z.array(z.string()).optional().nullable(),
        }),
    ),
});

export type propertyFormType = z.infer<typeof propertySchema>;

export const VariantFileSchema = z.object({
    id: z.coerce.number().or(z.string()).optional().nullable(),
    name: z.string().optional(),
    size: z.number().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
    file: z.any(),
    order: z.number().optional(),
    isCover: z.boolean(),
});

export const variantSchema = z.object({
    id: z.number().or(z.string()).optional().nullable(),
    name: z.string().nullable().optional(),
    files: z.array(VariantFileSchema).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    toRemove: z.array(z.string()).optional().nullable(),
});

export type VariantFormType = z.infer<typeof variantSchema>;
