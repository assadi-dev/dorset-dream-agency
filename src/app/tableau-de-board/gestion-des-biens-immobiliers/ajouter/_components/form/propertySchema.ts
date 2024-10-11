import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchema = z.object({
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().nullable(),
    address: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    factoryPrice: z.number(),
    sellingPrice: z
        .string({ message: REQUIRE_MESSAGE_ERROR })
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((value) => parseInt(value)),
    rentalPrice: z
        .string({ message: REQUIRE_MESSAGE_ERROR })
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((value) => parseInt(value)),
    purchaseType: z.enum(["Location", "Vente"], { message: REQUIRE_MESSAGE_ERROR }),
    isFurnish: z.boolean(),
    //categoryProperty: z.object({ label: z.string(), value: z.string() }),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string().nullable(),
    isAvailable: z.boolean(),
});

export type propertyFormType = z.infer<typeof propertySchema>;
