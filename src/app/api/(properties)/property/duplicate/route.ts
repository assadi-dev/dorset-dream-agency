import { duplicateProperty } from "@/database/drizzle/repositories/properties";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        id: string;
    };
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const property = await duplicateProperty(body);
        return NextResponse.json(
            { id: property.id, message: `La propriété ${body.name} dupliqué avec succès` },
            { status: 201 },
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
};
