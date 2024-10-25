import { getPropertiesWithVariantsCollections } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = await getPropertiesWithVariantsCollections({ type: "Prestige" });
        return NextResponse.json(response);
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
