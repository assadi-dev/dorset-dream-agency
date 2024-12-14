import { EMAIL_INVALID, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const EmployeeDataForm = z.object({
    id: z.coerce.number(),
    lastName: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    email: z.string().email({ message: EMAIL_INVALID }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().optional().nullable(),
});

export type EmployeeDataFormType = z.infer<typeof EmployeeDataForm>;

export const PasswordSchema = z
    .object({
        username: z.string({ message: EMAIL_INVALID }).email({ message: EMAIL_INVALID }),
        password: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
        confirmPassword: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: `Les mots de passe ne correspondent pas`,
                path: ["root", "password"],
            });
        }
    });

export type PasswordFormType = z.infer<typeof PasswordSchema>;
