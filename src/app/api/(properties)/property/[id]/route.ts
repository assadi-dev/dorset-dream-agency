import { getOnePropertyWithVariant, propertyParser } from "@/database/drizzle/repositories/properties";
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
        const propertyFound = await getOnePropertyWithVariant(id);
        const retrieveGallery: any[] = [];

        for (const variant of propertyFound.variants) {
            const result = await getOneVariantWithGallery(variant.id);
            retrieveGallery.push(result);
        }

        const response = {
            ...propertyFound,
            variants: retrieveGallery,
        };

        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
