import { accountCollections } from "@/app/tableau-de-board/gestion-des-comptes/action";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await accountCollections();
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json("");
    }
}
