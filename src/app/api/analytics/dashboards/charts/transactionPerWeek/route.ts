import {
    statTransactionPerSecteurChart,
    statTransactionPerWeekChart,
} from "@/database/drizzle/repositories/transactions";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const {
            nextUrl: { searchParams },
        } = request;

        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";
        const result = await statTransactionPerWeekChart({ startDate, endDate });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 },
        );
    }
}