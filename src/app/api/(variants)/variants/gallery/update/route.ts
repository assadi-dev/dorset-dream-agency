import { updateVariantGallery } from "@/database/drizzle/repositories/galleries";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const variant = await updateVariantGallery(formData);
        return NextResponse.json({
            message: `Update gallery success`,
            variant,
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
