import { messagesRepository } from "@/database/nedb/chats/messagesRepository";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    };
};
export const GET = async ({ params: { id } }: Params) => {
    try {
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
