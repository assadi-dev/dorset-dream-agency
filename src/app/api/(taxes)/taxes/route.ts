import { NextRequest, NextResponse } from "next/server";
import { taxesReadService } from "../_services/taxesRead";
import { handleApiError } from "@/lib/handler";
import { taxesWriteService } from "../_services/taxeWrite";
export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const result = await taxesReadService.collections();
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
        const result = await taxesWriteService.delete(body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}
