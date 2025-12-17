import { reportException } from "@/lib/logger";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const result: any[] = [];
        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json(
                {
                    message: error.message,
                },
                { status: 500 },
            );
        }
    }
};
