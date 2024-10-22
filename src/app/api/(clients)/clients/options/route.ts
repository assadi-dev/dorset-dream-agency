import { getClientsOptions } from "@/database/drizzle/repositories/clients";
import { NextResponse } from "next/server";
import { clientOptionSchema } from "./schema";
export const dynamic = "force-dynamic";
export const GET = async () => {
    try {
        const result = await getClientsOptions();
        const data = result?.map((item) => clientOptionSchema.parse(item));
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
