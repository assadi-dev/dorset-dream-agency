import { getPropertiesWithCover } from "@/database/drizzle/repositories/properties";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    try {
        const {
            nextUrl: { searchParams },
        } = request;
        const limit = Number(searchParams.get("limit")) || 5;
        const category = searchParams.get("category") || "";
        const order = searchParams.get("order")?.toLowerCase() || "desc";
        const propertiesWithCover = await getPropertiesWithCover({ limit, category, order: order as "desc" | "asc" });
        return NextResponse.json(propertiesWithCover);
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
