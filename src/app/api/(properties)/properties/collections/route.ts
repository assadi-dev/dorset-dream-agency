import { getPropertiesCollections } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getPropertiesCollections();

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
