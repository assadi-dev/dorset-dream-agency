import { createVariantGallery } from "@/database/drizzle/repositories/galleries";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        await createVariantGallery(formData);
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
