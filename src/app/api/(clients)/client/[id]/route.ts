import { updateClient } from "@/app/tableau-de-board/gestion-des-clients/actions";
import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    type Client = typeof clients.$inferSelect;
    const clientsList: Client[] = await db.select().from(clients);

    return NextResponse.json(clientsList);
}

export async function PUT(req: Request, ctx: any) {
    try {
        const body = await req.json();
        const id = ctx.params.id;

        await updateClient(id, body);
        console.log(body);

        const success = { message: "client has been update" };
        return NextResponse.json({
            message: success,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
}
