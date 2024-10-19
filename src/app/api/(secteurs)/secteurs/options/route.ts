import { getSecteursOptions } from "@/database/drizzle/repositories/secteurs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const secteurs = await getSecteursOptions();
        return NextResponse.json(secteurs);
    } catch (error) {
        const message = error.message;
        return NextResponse.json(
            {
                message,
            },
            {
                status: 500,
            },
        );
    }
};
