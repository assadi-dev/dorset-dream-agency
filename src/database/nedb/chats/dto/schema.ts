import z from "zod";

export const llmSchemaRole = ["system", "user", "assistant"] as const;

export const aiMessageSchema = z.object({
    id: z.string(),
    conversationId: z.string(),
    role: z.enum(llmSchemaRole),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const aiMessageSchemaParser = {
    validate: (inputs: unknown) => aiMessageSchema.safeParse(inputs),
};

export const aiConversationSchema = z.object({
    id: z.string(),
    title: z.string(),
    model: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const aiConversationSchemaParser = {
    validate: (inputs: unknown) => aiConversationSchema.safeParse(inputs),
};
