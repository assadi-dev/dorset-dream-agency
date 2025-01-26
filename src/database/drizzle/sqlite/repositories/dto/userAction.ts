import { z } from "zod";

const UserActionZodEnum = ["create", "update", "delete", "restore"] as const;

export const userActionSchema = z.object({
    user: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional().nullable(),
    grade: z.string(),
    action: z.enum(UserActionZodEnum),
    timestamp: z.boolean().optional().nullable(),
});

export type UserActionCreateInputDto = z.infer<typeof userActionSchema>;
export const userActionValidator = (values: unknown) => userActionSchema.safeParse(values);
