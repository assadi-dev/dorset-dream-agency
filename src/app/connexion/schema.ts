import { EMAIL_INVALID, REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: EMAIL_INVALID }).min(2, {
        message: REQUIRE_MESSAGE_ERROR,
    }),
    password: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
