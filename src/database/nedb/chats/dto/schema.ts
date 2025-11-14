import z from "zod";

export const llmSchemaRole = ["system", "user", "assistant"] as const;

export const aiMessageSchema = z.object({
    conversationId: z.string(),
    role: z.enum(llmSchemaRole),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type AiMessageSchemaInfer = z.infer<typeof aiMessageSchema>;

export const aiMessageSchemaParser = {
    validate: (inputs: unknown) => aiMessageSchema.safeParse(inputs),
};

export const aiConversationBaseSchema = z.object({
    title: z.string(),
    model: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export const aiConversationSchema = aiConversationBaseSchema.extend({ _id: z.string().optional() });

export type aiConversationSchemaInfer = z.infer<typeof aiConversationBaseSchema>;

export const aiConversationSchemaParser = {
    validate: (inputs: unknown) => aiConversationBaseSchema.safeParse(inputs),
    generateData: (inputs: { title: string; model: string }) => {
        const dateNow = new Date();

        return {
            title: inputs.title,
            model: inputs.model,
            createdAt: dateNow,
            updatedAt: dateNow,
        } satisfies aiConversationSchemaInfer;
    },
};
