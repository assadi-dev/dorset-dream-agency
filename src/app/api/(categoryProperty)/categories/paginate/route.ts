import { getCategoriesPaginate } from "@/database/drizzle/repositories/categories";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";


export async function GET(request:NextRequest) {
        try {
               const {
                   nextUrl: { searchParams },
               } = request;
               const filter = ExtractFilterParams(searchParams);
        const result = await getCategoriesPaginate(filter);
        return NextResponse.json(result);
    } catch (error: any) {
        if (error instanceof Error)
            return NextResponse.json({
                error: error.message,
            });
    }
}