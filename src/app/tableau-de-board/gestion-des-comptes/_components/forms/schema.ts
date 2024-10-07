import { EMAIL_INVALID, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const gestionAccountEmployeeSchema = z
    .object({
        username: z.string().email("Format email invalide !").min(1, { message: REQUIRE_MESSAGE_ERROR }),
        password: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        confirmPassword: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        role: z.enum(["user", "admin"]),
        lastName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        firstName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        post: z.enum(["Employée", "Manageuse", "Patron", "Employé San Andreas", "Employé îles Galapagos"]),
        iban: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        gender: z.enum(["Male", "Female"]),
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

export type GestionEmployeeFormType = z.infer<typeof gestionAccountEmployeeSchema>;

const passwordSchema = z
    .object({
        password: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
        confirmPassword: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: `Les mots de passe ne correspondent pas`,
                path: ["root"],
            });
        }
    });

export type passwordValidatorType = z.infer<typeof passwordSchema>;

export const passwordValidator = (params: passwordValidatorType) => passwordSchema.safeParse(params);

export const userSchema = z.object({
    username: z.string().email(EMAIL_INVALID).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    password: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    confirmPassword: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    role: z.enum(["user", "admin"]),
});

export type UserCreateInputDto = z.infer<typeof userSchema>;

export const userValidator = (values: UserCreateInputDto) => userSchema.safeParse(values);

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
