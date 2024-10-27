import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

const PROPERTY_TYPE = ["Location LS", "Location Iles", "Ventes LS", "Vente Iles"] as const;

export const LocationVentesSchema = z.object({
    client: z.coerce.number().or(z.string()),
    employee: z.coerce.number().optional().nullable(),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    property: z.coerce.number().or(z.string()),
    propertyService: z.enum(PROPERTY_TYPE),
    price: z.coerce.number(),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type LocationVentesFormType = z.infer<typeof LocationVentesSchema>;

export const PROPERTY_TYPE_ENUM = PROPERTY_TYPE.map((v) => ({ label: v, value: v }));
