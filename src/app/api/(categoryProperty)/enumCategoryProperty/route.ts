import { db } from "@/database";
import { categoryProperties } from "@/database/drizzle/schema/categoryProperties";
import { desc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await db
            .select({
                id: categoryProperties.id,
                label: categoryProperties.name,
                value: sql`lower(${categoryProperties.id})`,
            })
            .from(categoryProperties)
            .orderBy(desc(categoryProperties.createdAt));

        return NextResponse.json(result);
    } catch (error: any) {
        if (error instanceof Error)
            return NextResponse.json({
                error: error.message,
            });
    }
}
