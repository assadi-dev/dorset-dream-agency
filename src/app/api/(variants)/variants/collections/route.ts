import { getVariantsCollections } from "@/database/drizzle/repositories/variants";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
    try {
        const variants = await getVariantsCollections();
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
