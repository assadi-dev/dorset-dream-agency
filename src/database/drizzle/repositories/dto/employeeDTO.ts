import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";
import { EMPLOYEE_POST } from "../../utils";

export const employeeSchema = z.object({
    lastName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    post: z.enum(EMPLOYEE_POST),
    iban: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    gender: z.enum(["Male", "Female"]),
    userID: z.number({ message: REQUIRE_MESSAGE_ERROR }).optional(),
    secteursIds: z.array(z.number()).optional().nullable(),
});

export type EmployeeCreateInputDto = z.infer<typeof employeeSchema>;
export const employeeValidator = (values: EmployeeCreateInputDto) => employeeSchema.safeParse(values);
