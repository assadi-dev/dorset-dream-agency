import { REQUIRE_MESSAGE } from "@/config/Messages";
import { z } from "zod";

export const clientFormSchema = z.object({
    lastName: z.string().min(1, { message: REQUIRE_MESSAGE }),
    firstName: z.string().min(1, { message: REQUIRE_MESSAGE }),
    phone: z.string().min(1, { message: REQUIRE_MESSAGE }),
    gender: z.enum(["Male", "Female"], { message: REQUIRE_MESSAGE }),
});

export type ClientFormType = z.infer<typeof clientFormSchema>;
