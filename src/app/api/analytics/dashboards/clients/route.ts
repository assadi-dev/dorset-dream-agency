import { statClientViews } from "@/database/drizzle/repositories/clients";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const {
            nextUrl: { searchParams },
        } = req;

        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";
        const result = await statClientViews({ startDate, endDate });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
