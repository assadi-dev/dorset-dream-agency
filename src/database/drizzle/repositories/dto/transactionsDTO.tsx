import { z } from "zod";

export const transactionSchema = z.object({
    employeeID: z.coerce.number(),
    clientID: z.coerce.number(),
    propertyID: z.coerce.number(),
    propertyService: z.enum([]),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string().min(1),
    sellingPrice: z.coerce.number(),
});

export type transactionSchemaType = z.infer<typeof transactionSchema>;
