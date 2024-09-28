import { z } from "zod";

const EnvSchema = z.object({
    HOME_PAGE: z.string(),
    AUTH_SECRET: z.string(),
    NEXT_AUTH_SIGN_IN_PAGE: z.string(),
    NEXT_AUTH_SIGN_IN_SUCCESS: z.string(),
    NEXT_AUTH_SIGN_OUT_REDIRECT: z.string(),
});

export const ENV = EnvSchema.parse(process.env);
