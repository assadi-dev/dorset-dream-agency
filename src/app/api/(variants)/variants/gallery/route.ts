import { createVariantGallery } from "@/database/drizzle/repositories/galleries";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        await createVariantGallery(formData);
        revalidatePath(request.url);
        return NextResponse.json({
            message: `Create gallery success`,
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
};
