import { getPropertiesCollections } from "@/database/drizzle/repositories/properties";
import { OrderType } from "@/database/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const {
            nextUrl: { searchParams },
        } = request;
        const limit = Number(searchParams.get("limit")) || 5;
        const page = Number(searchParams.get("page")) || 1;
        const order = searchParams.get("order")?.toLowerCase() || "desc";
        const search = searchParams.get("search")?.toLowerCase() || null;
        const filter = { search, page, limit, order: order as OrderType };

        const properties = await getPropertiesCollections(filter);

        const response = properties;
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 },
        );
    }
}
