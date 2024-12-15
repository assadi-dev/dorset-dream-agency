import { EMAIL_INVALID, MIN_LENGTH_MESSAGE, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const EmployeeDataForm = z.object({
    iban: z.string().optional().nullable(),
    lastName: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    email: z.string().email({ message: EMAIL_INVALID }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().optional().nullable(),
});

export type EmployeeDataFormType = z.infer<typeof EmployeeDataForm>;
export const usernameSchema = z.object({
    username: z.string({ message: EMAIL_INVALID }).email({ message: EMAIL_INVALID }),
});
export type UsernameFormType = z.infer<typeof usernameSchema>;

export const PasswordSchema = z
    .object({
        password: z
            .string({ message: REQUIRE_MESSAGE_ERROR })
            .min(6, { message: MIN_LENGTH_MESSAGE.replace("{{length}}", "6") }),
        confirmPassword: z
            .string({ message: REQUIRE_MESSAGE_ERROR })
            .min(6, { message: MIN_LENGTH_MESSAGE.replace("{{length}}", "6") }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: `Les mots de passe ne correspondent pas`,
                path: ["confirmPassword"],
            });
        }
    });

export type PasswordFormType = z.infer<typeof PasswordSchema>;
