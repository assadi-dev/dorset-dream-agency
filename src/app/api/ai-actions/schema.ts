import { AI_ACTIONS_VALUES } from "@/components/Text/RichTextEditor/utils";
import { z } from "zod";

export const ChatConversationSchema = z.object({
    role: z.enum(["system", "user", "assistant"]),
    content: z.string(),
});

export type ChatConversationSchemaInfer = z.infer<typeof ChatConversationSchema>;
const actionsEnum = Object.keys(AI_ACTIONS_VALUES) as any;

export const requestBodySchema = z.object({
    action: z.enum(actionsEnum),
    prompt: z.string().min(1),
    conversationId: z.string(),
});

const OPEN_ROUTER_ROLE = ["user", "assistant", "system"];

export const OpenRouterMessageSchema = z.object({
    role: z.enum(OPEN_ROUTER_ROLE as any),
    content: z.string(),
});

export const OpenRouterBodySchema = z.object({
    name: z.string().optional().nullable(),
    model: z.string(),
    messages: z.array(OpenRouterMessageSchema).min(1),
    stream: z.boolean(),
    temperature: z.number(),
});

export const OllamaBodySchema = z.object({
    model: z.string(),
    messages: z.array(ChatConversationSchema).min(1),
    stream: z.boolean(),
    options: z.object({
        temperature: z.number(),
        num_predict: z.number(),
    }),
});
