import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handler";
import { taxesReadService } from "../../_services/taxesRead";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
    try {
        const result = await taxesReadService.getList();
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}