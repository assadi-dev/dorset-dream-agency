import { EMAIL_INVALID, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const employeeSchema = z.object({
    lastName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    post: z.enum(["Employée", "Manageuse", "Patron", "Employé San Andreas", "Employé îles Galapagos"]),
    iban: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    gender: z.enum(["Male", "Female"]),
    userID: z.number({ message: REQUIRE_MESSAGE_ERROR }).optional(),
});

export type EmployeeCreateInputDto = z.infer<typeof employeeSchema>;
export const employeeValidator = (values: EmployeeCreateInputDto) => employeeSchema.safeParse(values);
