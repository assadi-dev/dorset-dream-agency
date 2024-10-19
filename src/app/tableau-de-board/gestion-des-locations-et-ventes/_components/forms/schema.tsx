import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

const PROPERTY_TYPE = ["Location LS", "Location Iles", "Ventes LS", "Vente Iles"] as const;

export const LocationVentesSchema = z.object({
    client: z.string({ message: REQUIRE_MESSAGE_ERROR }),
    employee: z.coerce.number(),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    property: z.string({ message: REQUIRE_MESSAGE_ERROR }),
    propertyService: z.enum(PROPERTY_TYPE),
    rentalPrice: z.coerce.number().optional(),
    sellingPrice: z.coerce.number().optional(),
    price: z.coerce.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    keyQuantity: z.coerce.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    keyNumber: z.coerce.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type LocationVentesFormType = z.infer<typeof LocationVentesSchema>;

export const PROPERTY_TYPE_ENUM = PROPERTY_TYPE.map((v) => ({ label: v, value: v }));
