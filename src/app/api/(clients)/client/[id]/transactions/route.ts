import { PurchaseType } from "@/app/types/properties";
import { db } from "@/database";
import { getLocationByPropertyType } from "@/database/drizzle/repositories/transactions";
import { clients } from "@/database/drizzle/schema/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};
type filterArg = {
    id: string | number;
    type?: PurchaseType | null;
};
export async function GET(req: NextRequest, { params: { id } }: Params) {
    const filter: Record<string, string | PurchaseType | null> = { id } satisfies filterArg;
    const params = req.nextUrl.searchParams;
    if (params.get("type")) filter.type = params.get("type");

    const clientsList = await getLocationByPropertyType(filter);

    return NextResponse.json(clientsList);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        type NewClient = typeof clients.$inferInsert;
        const newClient: NewClient = {
            lastName: body.lastName,
            firstName: body.firstName,
            gender: body.gender,
            phone: body.phone,
        };

        await db.insert(clients).values(newClient);

        return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
