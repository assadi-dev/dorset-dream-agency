import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        return NextResponse.json({
            message: `Voici le text corriger`,
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
