import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const AnnouncementSchema = z.object({
    id: z.optional(z.number()).nullable(),
    title: z.string({ message: REQUIRE_MESSAGE_ERROR }).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().optional().nullable(),
    author: z.number().optional().nullable(),
});

export type AnnouncementFormType = z.infer<typeof AnnouncementSchema>;
