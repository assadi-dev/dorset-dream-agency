import { updatePropertyDto } from "@/database/drizzle/repositories/dto/propertiesDTO";
import {
    getOnePropertyWithVariant,
    propertyParser,
    removeProperty,
    updateProperty,
} from "@/database/drizzle/repositories/properties";
import { getOneVariantWithGallery } from "@/database/drizzle/repositories/variants";
import { NextRequest, NextResponse } from "next/server";

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

export const PUT = async (req: NextRequest, { params: { id } }: Params) => {
    try {
        const body = await req.json();
        const response = await updateProperty(id, body);
        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};

export const DELETE = async (req: NextRequest, { params: { id } }: Params) => {
    try {
        await removeProperty([id]);
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
