import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async () => {
    try {
        const search = "test";
        const response = await getEmployeeCollections({ search });

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
