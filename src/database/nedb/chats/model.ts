import { LLmRole } from "@/app/api/ai-actions/types/type";
import { aiConversationSchema, aiMessageSchema } from "./dto/schema";
import z from "zod";

export type MessageInfer = z.infer<typeof aiMessageSchema>;
export type InsertMessage = Omit<MessageInfer, "id">;

export type ConversationInfer = z.infer<typeof aiConversationSchema>;
export type InsertConversationInfer = Omit<ConversationInfer, "_id">;
