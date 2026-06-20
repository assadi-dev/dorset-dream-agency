import { getCategoryByName } from "@/database/drizzle/repositories/categories";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type Params = {
    params: Promise<{ name: string }>;
};
export async function GET(req: Request, { params }: Params) {
    try {
        const { name } = await params;
        const result = await getCategoryByName(name);
        return NextResponse.json(result);
    } catch (error: any) {
        if (error instanceof Error)
            return NextResponse.json({
                error: error.message,
            });
    }
}
