import { ENV } from "@/config/global";
import { conversationRepository } from "@/database/nedb/chats/conversationRepository";
import { NextRequest, NextResponse } from "next/server";
import { createConversationParser } from "../schema";
import { zodJsonResponse } from "@/lib/apihelpers";

type Params = {
    params: {
        id: string;
    };
};
export const GET = async (request: NextRequest, { params: { id } }: Params) => {
    try {
        const conversation = await conversationRepository.findOne(id);
        return NextResponse.json(conversation);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    }
};

export const DELETE = async (request: NextRequest, { params: { id } }: Params) => {
    try {
        await conversationRepository.delete(id);
        return NextResponse.json({
            message: `conversation has been successfully deleted !`,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    }
};
