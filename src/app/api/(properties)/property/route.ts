import { createVariantGallery } from "@/database/drizzle/repositories/galleries";
import { insertProperty } from "@/database/drizzle/repositories/properties";
import { insertVariant } from "@/database/drizzle/repositories/variants";
import { NextResponse } from "next/server";

type variantType = {
    name: string;
    files: Array<string>;
};
type BodyType = {
    name: string;
    rentalPrice: string;
    sellingPrice: string;
    isFurnish: boolean;
    variants: Array<variantType>;
};
export const POST = async (req: Request, res: Response) => {
    try {
        const body: BodyType = await req.json();
        const newProperty = await insertProperty(body);

        return NextResponse.json(newProperty);
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
