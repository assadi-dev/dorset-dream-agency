import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { paginateMetadata } from "@/lib/database";
import { and, eq, like, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    type Client = typeof clients.$inferSelect;
    const [countResult] = await db
        .select({
            count: sql`COUNT(id)`.mapWith(Number).as("count"),
        })
        .from(clients);

    const url = req.nextUrl.searchParams;

    const limit = parseInt(url.get("limit") || "10");
    const page = parseInt(url.get("page") || "1");
    const search = url.get("search");

    const pageMetadata = paginateMetadata({ page, count: countResult.count, limit });

    const condition = search ? and(like(clients.firstName, `%${search}%`)) : null;

    const clientResult = await db.select().from(clients).where(condition).limit(limit).offset(pageMetadata.offset);

    const result = {
        data: clientResult,
        ...pageMetadata,
    };
    return NextResponse.json(result);
}
