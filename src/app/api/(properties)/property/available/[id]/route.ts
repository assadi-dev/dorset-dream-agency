import {
    getOnePropertyByID,
    getOnePropertyByVariantID,
    updateProperty,
} from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

type BodyType = {
    isAvailable: boolean;
};
type Params = {
    params: {
        id: string;
    };
};
export const PUT = async (req: Request, { params: { id } }: Params) => {
    try {
        const body: Partial<BodyType> = await req.json();

        const data = { isAvailable: body.isAvailable };
        const updatedProperty = await updateProperty(id, data);

        return NextResponse.json(updatedProperty);
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
