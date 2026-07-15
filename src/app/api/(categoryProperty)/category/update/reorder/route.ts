import { handleApiError } from "@/lib/handler";
import { NextResponse } from "next/server";
import { categoryPropertyWriteService } from "../../../_services/categoryPropertyWrite";

export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        await categoryPropertyWriteService.reorder(body);
        return NextResponse.json({ message: "Position de la catégorie mise à jour avec succès" }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
};