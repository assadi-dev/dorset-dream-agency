import { insertProperty } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

type BodyType = {
    name: string;
    address: string;
    description: string;
    factoryPrice: number;
    sellingPrice: number;
    rentalPrice: number;
    categoryID: number;
    isFurnish: boolean;
    isAvailable: boolean;
};
export const POST = async (req: Request) => {
    try {
        const body: Partial<BodyType> = await req.json();
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
