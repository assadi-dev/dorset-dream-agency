import { getPropertiesWithVariantsCollections } from "@/database/drizzle/repositories/properties";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    try {
        const {
            nextUrl: { searchParams },
        } = request;
        const filter = ExtractFilterParams(searchParams);
        const response = await getPropertiesWithVariantsCollections({ ...filter, categoryName: "Prestige" });
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
