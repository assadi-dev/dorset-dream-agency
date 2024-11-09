import { getPropertiesCollections } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const properties = await getPropertiesCollections();

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
