import { getOneVariantWithGallery, updateVariant } from "@/database/drizzle/repositories/variants";
import { reportException } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: Promise<{
        id: string;
    }>;
};
export const GET = async (req: Request, { params }: Params) => {
    try {
        const { id } = await params;
        const variantFound = await getOneVariantWithGallery(id);

        return NextResponse.json(variantFound);
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const body = await req.json();
        const variantFound = await updateVariant(id, body);

        return NextResponse.json(variantFound);
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
