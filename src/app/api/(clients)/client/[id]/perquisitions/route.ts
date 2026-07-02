import { getClientPerquisitionWithPhotos } from "@/database/drizzle/repositories/perquisitions";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const clientId = Number(id);
        const searchParams = req.nextUrl.searchParams;
        const filters = ExtractFilterParams(searchParams);

        const clientPerquisition = await getClientPerquisitionWithPhotos(clientId, filters);
        return NextResponse.json(clientPerquisition);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
