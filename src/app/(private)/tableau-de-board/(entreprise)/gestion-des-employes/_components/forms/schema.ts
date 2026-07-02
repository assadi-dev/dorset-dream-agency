import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const gestionEmployeeSchema = z.object({
    lastName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    post: z.enum(["Employée", "Manageuse", "Patron", "Employé San Andreas", "Employé îles Galapagos"]),
    iban: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    gender: z.enum(["Male", "Female"]),
    secteur: z.array(z.object({ label: z.string().optional(), value: z.string().optional() })),
});

export type gestionEmployeeSchemaType = z.infer<typeof gestionEmployeeSchema>;
