import { getTransactionCollection } from "@/database/drizzle/repositories/transactions";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getTransactionCollection();

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
