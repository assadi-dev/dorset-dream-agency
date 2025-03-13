import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const announceSchema = z.object({
    title: z.string().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    description: z.string().optional().nullable(),
    path: z.string().optional().nullable(),
    settings: z.string().optional().nullable(),
    author: z.number().min(1),
    isPublish: z.boolean().optional(),
});

export type AnnounceCreateInputDto = z.infer<typeof announceSchema>;
export const announceValidator = (values: unknown) => announceSchema.safeParse(values);
