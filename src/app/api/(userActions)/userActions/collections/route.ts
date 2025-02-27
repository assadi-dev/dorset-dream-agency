import { getUserActionsCollections } from "@/database/drizzle/sqlite/repositories/usersAction";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const {
            nextUrl: { searchParams },
        } = request;

        const filter = ExtractFilterParams(searchParams);
        const extrasFilter = {
            from: "",
            to: "",
            columns: ["update", "delete"],
        };
        const response = await getUserActionsCollections({ ...filter, ...extrasFilter });

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json("");
    }
}
