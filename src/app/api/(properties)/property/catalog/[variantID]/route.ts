import { getPropertyDetailForCatalogueWithGallery } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        variantID: string;
    };
};
export const GET = async (req: Request, { params: { variantID } }: Params) => {
    try {
        const property = await getPropertyDetailForCatalogueWithGallery(Number(variantID));
        return NextResponse.json(property);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
