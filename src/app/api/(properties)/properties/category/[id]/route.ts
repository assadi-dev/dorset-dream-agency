import { getPropertiesCollections } from "@/database/drizzle/repositories/properties";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const {
            nextUrl: { searchParams },
        } = request;

        const filter = ExtractFilterParams(searchParams);
        const category = Number(searchParams.get("category")) ?? undefined;
        const properties = await getPropertiesCollections({ ...filter, category });

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
