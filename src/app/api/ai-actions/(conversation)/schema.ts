import { aiMessageSchemaBase } from "@/database/nedb/chats/dto/schema";
import { InsertMessage } from "@/database/nedb/chats/model";
import z from "zod";

export const createConversationBody = z.object({
    id: z.string().optional().nullable(),
    title: z.string(),
});

export const createConversationParser = {
    validate: (inputs: unknown) => createConversationBody.safeParse(inputs),
    generateId: () => Date.now(),
};

export const createMessageBodySchema = aiMessageSchemaBase.omit({ createdAt: true, updatedAt: true });
export type createMessageBodySchemaInfer = z.infer<typeof createMessageBodySchema>;

export const createMessageParser = {
    validate: (inputs: unknown) => createMessageBodySchema.safeParse(inputs),
};
