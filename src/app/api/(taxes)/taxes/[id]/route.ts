import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handler";
import { taxesWriteService } from "../../_services/taxeWrite";

type Props = {
    params: Promise<{ id: string }>;
};
export const PUT = async ({ params }: Props, req: NextRequest) => {
    try {
        const { id } = await params;
        const body = await req.json();
        const result = await taxesWriteService.update(Number(id), body);
        return NextResponse.json(result);
    } catch (error: any) {
        return handleApiError(error);
    }
}