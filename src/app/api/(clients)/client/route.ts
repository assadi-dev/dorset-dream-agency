import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
    type Client = typeof clients.$inferSelect;
    const clientsList: Client[] = await db.select().from(clients);

    return NextResponse.json(clientsList);
}

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

    return NextResponse.json({ message: "ok" }, { status: 200 });
}
