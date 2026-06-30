import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handler";
import { categoryPropertyWriteService } from "../_services/categoryPropertyWrite";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const result = await categoryPropertyWriteService.create(body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}


export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const result = await categoryPropertyWriteService.delete(body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}
