import { zodJsonResponse } from "@/lib/apihelpers";
import { NextRequest, NextResponse } from "next/server";
import { createMessageParser } from "../schema";
import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { aiMessageSchemaParser } from "@/database/nedb/chats/dto/schema";
import { captureException } from "@/lib/logger";

export const GET = async () => {
    try {
    } catch (error) {}
};

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const validate = createMessageParser.validate(requestBody);
        if (validate.error) {
            return zodJsonResponse(validate.error);
        }
        const validateData = validate.data;
        const prepareMessage = aiMessageSchemaParser.generate(validateData.role, validateData);
        const message = await messagesRepository.create(prepareMessage);
        return NextResponse.json(message);
    } catch (error: unknown) {
        if (error instanceof Error) {
            captureException(error);
            return NextResponse.json({
                message: error.message,
            });
        }
    }
};
