import { setAvailableProperties } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

type BodyType = {
    isAvailable: boolean;
};
type Params = {
    params: Promise<{
        id: string;
    }>;
};
export const PUT = async (req: Request, { params }: Params) => {
    try {
        const { id } = await params;
        const body: Partial<BodyType> = await req.json();
        const idProperty = Number(id);
        const value = body.isAvailable as boolean;

        const updatedProperty = await setAvailableProperties(idProperty, value);

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
