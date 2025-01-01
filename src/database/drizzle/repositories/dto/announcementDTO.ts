import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import { z } from "zod";

export const announceSchema = z.object({
    title: z.string().min(1),
    description: z.string().nullable(),
    path: z.string().nullable(),
    settings: z.string().nullable(),
    author: z.number().min(1),
    isPublish: z.boolean(),
});

export type AnnounceCreateInputDto = z.infer<typeof announceSchema>;
export const announceValidator = (values: unknown) => announceSchema.safeParse(values);
