import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export const GET = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const result = await messagesRepository.findOne(id);
        if (!result) return NextResponse.json({ message: "message not found" });

        return NextResponse.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            });
        }
    }
};
