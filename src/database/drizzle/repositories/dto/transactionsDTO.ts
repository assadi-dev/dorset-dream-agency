import { z } from "zod";

export const transactionSchema = z.object({
    employeeID: z.coerce.number(),
    clientID: z.coerce.number(),
    propertyID: z.coerce.number(),
    propertyService: z.enum(["Location LS", "Location Iles", "Ventes LS", "Vente Iles"]),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string(),
    sellingPrice: z.coerce.number(),
});

export const decodeTransactionInput = (values: unknown) => transactionSchema.safeParse(values);

export type transactionSchemaType = z.infer<typeof transactionSchema>;
