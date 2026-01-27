import { getOneByName } from "@/database/drizzle/repositories/variants";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GetParams = {
    params: { name: string };
};
export const GET = async (req: Request, { params: { name } }: GetParams) => {
    try {
        const variants = await getOneByName(name);
        return NextResponse.json(variants);
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
