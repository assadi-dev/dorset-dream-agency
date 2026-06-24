import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export const GET = async (request: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const result = await messagesRepository.byConversation(id);
        return NextResponse.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            });
        }
    }
};
