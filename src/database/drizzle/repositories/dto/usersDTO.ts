import { EMAIL_INVALID, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const userSchema = z.object({
    username: z
        .string({ message: REQUIRE_MESSAGE_ERROR })
        .email(EMAIL_INVALID)
        .min(1, { message: REQUIRE_MESSAGE_ERROR }),
    password: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    confirmPassword: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    role: z.enum(["user", "admin"]),
});

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

export type UserCreateInputDto = z.infer<typeof userSchema>;

export const userValidator = (values: UserCreateInputDto) => userSchema.safeParse(values);
