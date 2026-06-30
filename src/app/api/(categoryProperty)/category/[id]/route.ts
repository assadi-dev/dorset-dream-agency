import { NextRequest, NextResponse } from "next/server";
import { categoryPropertyWriteService } from "../../_services/categoryPropertyWrite";
import { handleApiError } from "@/lib/handler";

type Props = {
    params: Promise<{ id: string }>;
}
export const PUT = async (req: NextRequest, { params }: Props) => {
    try {
        const body = await req.json();
        const { id } = await params;
        const result = await categoryPropertyWriteService.update(Number(id), body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}