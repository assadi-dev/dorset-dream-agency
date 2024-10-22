import { getPropertiesWithVariantsCollections } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getPropertiesWithVariantsCollections();

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
