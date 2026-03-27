import { updateDecoratorProfile } from "@/database/drizzle/repositories/decoratorProfiles";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    };
};

export const PUT = async (req: Request, { params: { id } }: Params) => {
    try {
        const body = await req.json();
        const decoratorProfile = await updateDecoratorProfile(Number(id), body);
        return NextResponse.json(decoratorProfile);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}