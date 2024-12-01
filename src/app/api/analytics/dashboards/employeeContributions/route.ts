import { employeesContribution, statIncomeTransaction } from "@/database/drizzle/repositories/transactions";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
//employeeContributions

export const GET = async (req: NextRequest) => {
    try {
        const {
            nextUrl: { searchParams },
        } = req;

        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";
        const filter = ExtractFilterParams(searchParams);
        const result = await employeesContribution({
            startDate,
            endDate,
            page: filter.page,
            limit: filter.limit,
            search: filter.search,
        });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
