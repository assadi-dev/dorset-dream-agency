import { getPropertiesWithCover } from "@/database/drizzle/repositories/properties";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    try {
        const {
            nextUrl: { searchParams },
        } = request;
        const limit = Number(searchParams.get("limit")) || 5;
        const isAvailable = searchParams.get("isAvailable");
        const category = searchParams.get("category");
        const order = searchParams.get("order")?.toLowerCase() || "desc";
        const search = searchParams.get("search");

        const propertiesWithCover = await getPropertiesWithCover({
            limit,
            category,
            order: order as "desc" | "asc",
            isAvailable: isAvailable ? Boolean(String(isAvailable) === "true") : undefined,
            search,
        });
        return NextResponse.json(propertiesWithCover);
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
