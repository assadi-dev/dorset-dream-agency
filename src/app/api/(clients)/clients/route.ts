import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    type Client = typeof clients.$inferSelect;
    const clientsList: Client[] = await db.select().from(clients);

    console.log(req.headers.get("page"));

    //const offset = page - 1 * per_page

    const result = {
        data: clientsList,
        total: 0,
        limit: 10,
        currentPage: 1,
        startPage: 0,
        endPage: 1,
    };
    return NextResponse.json(result);
}
