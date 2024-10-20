import { getEmployeeCollections } from "@/database/drizzle/repositories/employee";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = await getEmployeeCollections();

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
