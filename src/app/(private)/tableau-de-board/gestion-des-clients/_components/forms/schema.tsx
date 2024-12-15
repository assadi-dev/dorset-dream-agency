import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const clientFormSchema = z.object({
    lastName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    firstName: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    gender: z.enum(["Male", "Female"], { message: REQUIRE_MESSAGE_ERROR }),
    isDead: z.boolean().optional(),
});

export type ClientFormType = z.infer<typeof clientFormSchema>;
