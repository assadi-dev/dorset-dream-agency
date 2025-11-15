import { AI_ACTIONS_VALUES } from "@/components/Text/RichTextEditor/utils";

export type AskAIActionUnion = keyof typeof AI_ACTIONS_VALUES;

export type LLmRole = "system" | "user" | "assistant";

export type OpenRouterRole = LLmRole;
