import { getDecoratorProfileCollections } from "@/database/drizzle/repositories/decoratorProfiles";
import { ExtractFilterParams } from "@/database/drizzle/utils";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
      const searchParams = req.nextUrl.searchParams;
     const filter = ExtractFilterParams(searchParams);
      const decoratorProfile = await getDecoratorProfileCollections(filter);
        return NextResponse.json(decoratorProfile);
    } catch (error) {
      if(error instanceof Error){
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}