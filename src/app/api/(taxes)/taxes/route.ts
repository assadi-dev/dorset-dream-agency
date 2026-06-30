import { NextRequest, NextResponse } from "next/server";
import { taxesReadService } from "../_services/taxesRead";
import { handleApiError } from "@/lib/handler";
import { taxesWriteService } from "../_services/taxeWrite";
import { ExtractFilterParams } from "@/database/drizzle/utils";
export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    try {
        const { nextUrl: { searchParams } } = request;
        const filter = ExtractFilterParams(searchParams);
        const result = await taxesReadService.collections(filter);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const result = await taxesWriteService.create(body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        await taxesWriteService.delete(body);
        return NextResponse.json({ message: "Taxe supprimée avec succès" });
    } catch (error: any) {
        return handleApiError(error);
    }
}
