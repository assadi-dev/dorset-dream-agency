import { authenticate } from "@/database/drizzle/repositories/users";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const user = await authenticate(body);
        return NextResponse.json(user);
    } catch (error) {
        let code = 500;
        if (error instanceof Error) {
            if (error.cause === "authentication") code = 401;
        }

        return NextResponse.json(
            {
                message: error.message || "Internal Server Error",
            },
            {
                status: code,
            },
        );
    }
};
