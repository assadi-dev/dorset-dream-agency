import { z } from "zod";

export const transactionSchema = z.object({
    employeeID: z.coerce.number(),
    clientID: z.coerce.number(),
    variantID: z.coerce.number(),
    propertyService: z.enum(["Location LS", "Location Favelas", "Ventes LS", "Ventes Favelas"]),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string(),
    sellingPrice: z.coerce.number(),
});

export const decodeTransactionInput = (values: unknown) => transactionSchema.safeParse(values);

export type transactionSchemaType = z.infer<typeof transactionSchema>;
