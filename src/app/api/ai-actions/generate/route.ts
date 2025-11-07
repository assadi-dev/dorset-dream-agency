import { NextResponse } from "next/server";
import { buildPrompt, buildPromptFromOllama, fetchWithOllama } from "../utils";
import { requestBodySchema } from "../schema";
import { OllamaBody } from "../types/ollamaType";
import { OLLAMA_CONFIG } from "@/config/ai-actions";
import { zodParserError } from "@/lib/parser";

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

        const { actions, text } = isValidate.data;
        const prompt = buildPromptFromOllama({ action: actions, userText: text });
        const ollamaBody = {
            options: prompt.options,
            model: prompt.model,
            prompt: prompt.prompt,
            stream: false,
        } satisfies OllamaBody;
        const response = await fetchWithOllama(ollamaBody);
        const data = await response?.json();

        return NextResponse.json({
            success: true,
            originalText: text,
            transformedText: data.response,
            action: actions,
            model: OLLAMA_CONFIG.model,
        });
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
