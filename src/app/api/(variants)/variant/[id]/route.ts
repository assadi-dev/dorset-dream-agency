import { getOneVariantWithGallery } from "@/database/drizzle/repositories/variants";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};
export const GET = async (req: Request, { params: { id } }: Params) => {
    try {
        const variantFound = await getOneVariantWithGallery(id);

        return NextResponse.json(variantFound);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
