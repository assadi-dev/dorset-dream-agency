import { getPropertiesCollections } from "@/app/tableau-de-board/gestion-des-biens-immobiliers/actions";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await getPropertiesCollections();

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
