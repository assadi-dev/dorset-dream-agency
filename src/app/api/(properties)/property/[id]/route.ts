import {
    getOnePropertyWithVariant,
    getPropertiesCollections,
    propertyParser,
} from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";
import { propertyResponseSchema } from "./dto";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};
export const GET = async (req: Request, { params: { id } }: Params) => {
    try {
        const propertyFound = await getOnePropertyWithVariant(id);
        const ids = propertyFound.variantID.split(",");
        const variantsIDs = ids.map((id: string) => Number(id));

        const propertyClean = await propertyParser(propertyFound);
        const response = {
            ...propertyClean,
        };

        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
