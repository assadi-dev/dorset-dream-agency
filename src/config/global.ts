import { z } from "zod";

const EnvSchema = z.object({
    APP_TITLE: z.coerce.string(),
    HOME_PAGE: z.coerce.string(),
    AUTH_SECRET: z.coerce.string(),
    NEXT_AUTH_SIGN_IN_PAGE: z.coerce.string(),
    NEXT_AUTH_SIGN_IN_SUCCESS: z.coerce.string(),
    NEXT_AUTH_SIGN_OUT_REDIRECT: z.coerce.string(),
});

export const ENV = EnvSchema.parse(process.env);
