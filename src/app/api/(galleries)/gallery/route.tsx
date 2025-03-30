import { updateGallery } from "@/database/drizzle/repositories/galleries";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    try {
        const body = (await request.json()) as {
            variantID: number;
            photoID: number;
            isCover?: boolean;
            order?: number;
        };

        const gallery = await updateGallery(body);

        return NextResponse.json({
            message: `Update gallery success`,
            gallery,
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
