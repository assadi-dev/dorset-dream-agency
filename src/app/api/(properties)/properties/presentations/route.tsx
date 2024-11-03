import { getFirstPictureFromGallery } from "@/database/drizzle/repositories/galleries";
import { getPropertyPresentation } from "@/database/drizzle/repositories/properties";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const limit = Number(request.headers.get("limit")) || 5;
        const category = request.headers.get("category") || "";
        const order = request.headers.get("order")?.toLowerCase() || "desc";
        const properties = await getPropertyPresentation({ limit, category, order: order as "desc" | "asc" });

        const propertiesWithCover = [];
        for (const property of properties) {
            const photo = await getFirstPictureFromGallery(property.id);
            const update = { ...property, photo: photo.url || null };
            propertiesWithCover.push(update);
        }
        return NextResponse.json(propertiesWithCover);
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
