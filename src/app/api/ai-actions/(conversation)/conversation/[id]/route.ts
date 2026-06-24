import { conversationRepository } from "@/database/nedb/chats/conversationRepository";
import { reportException } from "@/lib/logger";

import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export const GET = async (request: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const conversation = await conversationRepository.findOne(id);
        return NextResponse.json(conversation);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            reportException(error);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    }
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        await conversationRepository.delete(id);
        return NextResponse.json({
            message: `the conversation has been successfully deleted !`,
        });
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
