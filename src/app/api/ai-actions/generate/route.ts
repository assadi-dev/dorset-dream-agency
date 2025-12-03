import { NextResponse } from "next/server";
import { requestBodySchema } from "../schema";
import { zodParserError } from "@/lib/parser";
import { generateFromProvider } from "./utils";
import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { AiMessageSchemaInfer } from "@/database/nedb/chats/dto/schema";
import { reportException } from "@/lib/logger";

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
        const response = await generateFromProvider({ provider: "openRouter", action, userText, history });

        return response;
    } catch (error: any) {
        if (error instanceof Error) {
            reportException(error);
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
