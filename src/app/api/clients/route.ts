import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    type NewClient = typeof clients.$inferInsert;
    const newClient: NewClient = {
        lastName: body.lastName,
        firstName: body.firstName,
        gender: body.gender,
        phone: body.phone,
    };

    await db.insert(clients).values(newClient);

    return NextResponse.json({ message: "ok" });
}
