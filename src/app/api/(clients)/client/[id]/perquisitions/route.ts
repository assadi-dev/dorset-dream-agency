import { getClientPerquisitionWithPhotos } from "@/database/drizzle/repositories/perquisitions";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};

export const GET = async (req: NextRequest, { params: { id } }: Params) => {
    try {
        const clientId = Number(id);

        const clientPerquisition = await getClientPerquisitionWithPhotos(clientId);
        return NextResponse.json(clientPerquisition);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
