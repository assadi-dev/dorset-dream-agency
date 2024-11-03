import { NextResponse } from "next/server";

type Params = {
    params: {
        variantID: string;
    };
};
export const GET = async (req: Request, { params: { variantID } }: Params) => {
    try {
        return NextResponse.json(variantID);
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
