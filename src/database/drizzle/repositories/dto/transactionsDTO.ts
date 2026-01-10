import { z } from "zod";
import { LOCATION_STATUS, PROPERTY_SERVICE } from "../../utils";

export const transactionSchema = z.object({
    employeeID: z.coerce.number(),
    clientID: z.coerce.number(),
    variantID: z.coerce.number(),
    propertyService: z.enum(PROPERTY_SERVICE),
    keyQuantity: z.coerce.number(),
    keyNumber: z.string(),
    sellingPrice: z.coerce.number(),
    status: z.enum(LOCATION_STATUS).default("ongoing"),
});

export const decodeTransactionInput = (values: unknown) => transactionSchema.safeParse(values);

export type transactionSchemaType = z.infer<typeof transactionSchema>;
