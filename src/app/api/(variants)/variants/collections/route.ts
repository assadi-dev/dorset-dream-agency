import { getVariantsCollections } from "@/database/drizzle/repositories/variants";
import { NextResponse } from "next/server";

export const GET = async () => {
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
