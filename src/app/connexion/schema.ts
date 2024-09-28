import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(1),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
