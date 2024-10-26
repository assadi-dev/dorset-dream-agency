import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

/**
 * Schema Ajouter un schema pour l'action du tableau Immobilier
 */
export const AddVariantSchema = z.object({
    propertyID: z.number().or(z.string()).nullable(),
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    files: z.array(z.any()).min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type AddVariantSchemaType = z.infer<typeof AddVariantSchema>;
