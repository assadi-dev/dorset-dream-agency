import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import z from "zod";

export const assignRequestBody = z.object({
    users: z.array(z.number()).min(1, { message: REQUIRE_MESSAGE_ERROR }),
    roleId: z.number().min(1, { message: REQUIRE_MESSAGE_ERROR }),
    assignerId: z.number().optional().nullable(),
});

export type AssignRequestBody = z.infer<typeof assignRequestBody>;

export const assignRequestParser = {
    validate: (inputs: unknown) => assignRequestBody.safeParse(inputs),
};
