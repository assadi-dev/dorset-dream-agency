import { getCategoriesForOptions } from "@/database/drizzle/repositories/categories";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const result = await getCategoriesForOptions();

        return NextResponse.json(result);
    } catch (error: any) {
        if (error instanceof Error)
            return NextResponse.json({
                error: error.message,
            });
    }
}
