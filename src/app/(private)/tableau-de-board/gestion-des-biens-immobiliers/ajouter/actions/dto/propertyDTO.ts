import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const propertySchemaInsert = z.object({
    name: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().nullable(),
    address: z.string().nullable(),
    factoryPrice: z.number(),
    sellingPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    rentalPrice: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    isFurnish: z.boolean(),
    categoryProperty: z.coerce.number({ message: REQUIRE_MESSAGE_ERROR }),
    isAvailable: z.boolean(),
    stock: z.coerce.number().nullable().optional(),
});

export const createPropertyDto = (values: unknown) => propertySchemaInsert.safeParseAsync(values);
