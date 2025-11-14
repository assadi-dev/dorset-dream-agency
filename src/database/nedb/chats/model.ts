import { LLmRole } from "@/app/api/ai-actions/types/type";
import { aiConversationBaseSchema, aiConversationSchema, aiMessageSchema, aiMessageSchemaBase } from "./dto/schema";
import z from "zod";

export type MessageInfer = z.infer<typeof aiMessageSchema>;
export type InsertMessage = z.infer<typeof aiMessageSchemaBase>;
export type UpdateMessage = Partial<MessageInfer>;

export type ConversationInfer = z.infer<typeof aiConversationSchema>;
export type InsertConversationInfer = z.infer<typeof aiConversationBaseSchema>;
export type updateConversationInfer = Partial<ConversationInfer>;
