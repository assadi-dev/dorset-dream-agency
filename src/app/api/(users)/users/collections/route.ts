import { getAccountCollections } from "@/database/drizzle/repositories/users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getAccountCollections();

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
