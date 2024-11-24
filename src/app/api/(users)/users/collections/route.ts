import { getAccountCollections } from "@/database/drizzle/repositories/users";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const {
            nextUrl: { searchParams },
        } = request;

        const filter = ExtractFilterParams(searchParams);
        const response = await getAccountCollections(filter);

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
