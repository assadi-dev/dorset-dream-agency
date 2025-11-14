import z from "zod";

export const createConversationBody = z.object({
    id: z.string().optional().nullable(),
    title: z.string(),
});

export const createConversationParser = {
    validate: (inputs: unknown) => createConversationBody.safeParse(inputs),
    generateId: () => Date.now(),
};
