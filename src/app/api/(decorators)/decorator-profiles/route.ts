import { deleteMultipleDecoratorProfiles } from "@/database/drizzle/repositories/decoratorProfiles";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const decoratorProfile = await deleteMultipleDecoratorProfiles(body.ids);
        return NextResponse.json(decoratorProfile);
    } catch (error) {
      if(error instanceof Error){
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}