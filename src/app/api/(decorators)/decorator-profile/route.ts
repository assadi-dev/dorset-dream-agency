import { createDecoratorProfile, createDecoratorProfileWithPhoto } from "@/database/drizzle/repositories/decoratorProfiles";
import { uploadPhotoDecorator } from "@/database/drizzle/repositories/decoratorProfilesUploadFile";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const formData = await req.formData();
    const decoratorProfile = await createDecoratorProfile(body);
  
    return NextResponse.json(decoratorProfile);
}