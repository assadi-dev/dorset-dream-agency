import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchema = z.object({
    name: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().nullable(),
    adresse: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    factoryPrice: z
        .string()
        .transform((value) => parseInt(value))
        .nullable(),
    sellingPrice: z.string().transform((value) => parseInt(value)),
    rentalPrice: z.string().transform((value) => parseInt(value)),
    purchaseType: z.enum(["Location", "Vente"]),
    isFurnish: z.boolean(),
    categoryProperty: z.object({ label: z.string(), value: z.string() }),
    keyQuantity: z.string().transform((value) => parseInt(value)),
    keyNumber: z.string().nullable(),
    isAvailable: z.boolean(),
});

export type propertyFormType = z.infer<typeof propertySchema>;
