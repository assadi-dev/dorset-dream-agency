import z from "zod";
import { InsertMessage } from "../model";
import { LLmRole } from "@/app/api/ai-actions/types/type";
import { createMessageBodySchemaInfer } from "@/app/api/ai-actions/(conversation)/schema";

export const llmSchemaRole = ["system", "user", "assistant"] as const;

export const aiMessageSchemaBase = z.object({
    conversationId: z.string(),
    role: z.enum(llmSchemaRole),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const aiMessageSchema = aiMessageSchemaBase.extend({ _id: z.string().optional() });

export type AiMessageSchemaInfer = z.infer<typeof aiMessageSchema>;

export const aiMessageSchemaParser = {
    validate: (inputs: unknown) => aiMessageSchema.safeParse(inputs),
    generate: (role: LLmRole, inputs: createMessageBodySchemaInfer) => {
        const dateNow = new Date();
        return {
            conversationId: inputs.conversationId,
            role: role,
            content: inputs.content,
            createdAt: dateNow,
            updatedAt: dateNow,
        } satisfies InsertMessage;
    },
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
