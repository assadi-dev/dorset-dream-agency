import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchema = z.object({
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().nullable(),
    address: z.string().nullable(),
    factoryPrice: z.number(),
    sellingPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    rentalPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    purchaseType: z.enum(["Location", "Vente"], { message: REQUIRE_MESSAGE_ERROR }),
    isFurnish: z.boolean(),
    categoryProperty: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string().nullable(),
    isAvailable: z.boolean(),
    variants: z.array(z.object({ name: z.string(), files: z.array(z.any()) })),
});

export type propertyFormType = z.infer<typeof propertySchema>;

export const variantSchema = z.object({
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    files: z.array(z.any()).min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type VariantFormType = z.infer<typeof variantSchema>;
