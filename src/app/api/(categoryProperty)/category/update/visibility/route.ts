import { NextResponse } from "next/server";
import { categoryPropertyWriteService } from "../../../_services/categoryPropertyWrite";
import { handleApiError } from "@/lib/handler";

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await categoryPropertyWriteService.toggleVisibility(body);
        return NextResponse.json({ message: "Category visibility updated successfully" });
    } catch (error) {
        return handleApiError(error);
    }
}