import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { LOCATION_STATUS } from "@/database/drizzle/utils";
import { z } from "zod";

const PROPERTY_TYPE = [
    "Location LS",
    "Ventes LS",
    "Location Las Venturas",
    "Ventes Las Venturas",
    "Location Blaine County",
    "Ventes Blaine County",
] as const;

export const LocationVentesSchema = z.object({
    client: z.coerce.number().or(z.string()),
    employee: z.coerce.number().optional().nullable(),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    property: z.coerce.number().or(z.string()),
    propertyService: z.enum(PROPERTY_TYPE),
    price: z.coerce.number(),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    invoice: z.string().optional().nullable(),
    status: z.enum(LOCATION_STATUS).default("ongoing"),
});

export type LocationVentesFormType = z.infer<typeof LocationVentesSchema>;

export const PROPERTY_TYPE_ENUM = PROPERTY_TYPE.map((v) => ({ label: v, value: v }));

export const LocationStatusFormSchema = z.object({
    ids: z.array(z.number()),
    status: z.enum(LOCATION_STATUS, { message: "Veuillez sélectionner un statut" }),
});

export type LocationStatusFormSchemaInfer = z.infer<typeof LocationStatusFormSchema>;
