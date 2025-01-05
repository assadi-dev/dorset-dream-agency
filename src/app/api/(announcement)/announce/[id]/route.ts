import { findOneByID } from "@/database/drizzle/repositories/announcements";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(req: NextRequest, { params: { id } }: Params) {
    try {
        if (!id) throw new Error("id missing");
        const announce = await findOneByID(Number(id));
        return NextResponse.json(announce);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                {
                    status: 500,
                },
            );
        }
    }
}
