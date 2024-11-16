import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const fileObjSchema = z.object({
    id: z.number().or(z.string()).optional(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    url: z.string().optional(),
    file: z.instanceof(File),
});

/**
 * Schema Ajouter un schema pour l'action du tableau Immobilier
 */
export const AddVariantSchema = z.object({
    propertyID: z.number().or(z.string()).nullable(),
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    files: z.array(fileObjSchema).min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type AddVariantSchemaType = z.infer<typeof AddVariantSchema>;

export type FileObjType = z.infer<typeof fileObjSchema>;
