import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const LocationVentesSchema = z.object({
    client: z.object(
        {
            id: z.string().transform((value) => parseInt(value)),
            label: z.string(),
            value: z.string(),
        },
        { message: REQUIRE_MESSAGE_ERROR },
    ),
    employee: z.object(
        {
            id: z.string().transform((value) => parseInt(value)),
            label: z.string(),
            value: z.string(),
        },
        { message: REQUIRE_MESSAGE_ERROR },
    ),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    address: z.string(),
    typeProperty: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    rentalPrice: z
        .string()
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((val) => parseInt(val)),
    seelingPrice: z
        .string()
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((val) => parseInt(val)),
    numberOfKey: z
        .string()
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((val) => parseInt(val)),
    propertyKey: z
        .string()
        .min(1, { message: REQUIRE_MESSAGE_ERROR })
        .transform((val) => parseInt(val)),
});

export type LocationVentesFormType = z.infer<typeof LocationVentesSchema>;
