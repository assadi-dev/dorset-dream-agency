import { NextResponse } from "next/server";
import {
    buildOpenRouterPrompt,
    buildPromptFromOllama,
    fetchOpenRouter,
    fetchWithOllama,
    snapshotOllamaBody,
    snapshotOpenRouterBody,
} from "../utils";
import { requestBodySchema } from "../schema";
import { OLLAMA_CONFIG } from "@/config/ai-actions";
import { zodParserError } from "@/lib/parser";
import { generateFromProvider } from "./utils";
import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { AiMessageSchemaInfer } from "@/database/nedb/chats/dto/schema";

export const POST = async (request: Request) => {
    try {
        const requestBody = await request.json();
        const isValidate = requestBodySchema.safeParse(requestBody);
        if (isValidate.error) {
            const parseError = zodParserError(isValidate.error);
            return NextResponse.json(
                { message: "invalid input", path: parseError },
                {
                    status: 400,
                },
            );
        }

        const { action, prompt: userText, conversationId } = isValidate.data;

        const conversations = (await messagesRepository.byConversation(conversationId)) as AiMessageSchemaInfer[];
        const history = conversations.map((item) => ({ role: item.role, content: item.content }));
        const response = await generateFromProvider({ provider: "ollama", action, userText, history });

        return response;
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500,
                },
            );
        }
    }
};
