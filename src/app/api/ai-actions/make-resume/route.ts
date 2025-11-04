import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        return NextResponse.json({
            message: `bref resumer du text`,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
