import { ENV } from "@/config/global";
import { conversationRepository } from "@/database/nedb/chats/conversationRepository";
import { NextRequest, NextResponse } from "next/server";
import { createConversationParser } from "../schema";
import { zodJsonResponse } from "@/lib/apihelpers";
import { obtainDefaultModel } from "../../utils";
import { reportException } from "@/lib/logger";

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const model = obtainDefaultModel();
        const validate = createConversationParser.validate(requestBody);
        if (validate.error) {
            return zodJsonResponse(validate.error);
        }
        const title = validate.data.title ?? "conv-" + Date.now();
        const conversation = await conversationRepository.create({ model, title });
        return NextResponse.json(conversation);
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    }
};
export const GET = async (request: NextRequest) => {
    try {
        const conversation = await conversationRepository.all();
        return NextResponse.json(conversation);
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    }
};
