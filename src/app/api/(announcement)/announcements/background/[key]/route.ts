import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { BACKGROUND_DIR_IMAGES } from "@/config/dir";

export const dynamic = "force-dynamic";

type Params = {
    params: Promise<{
        key: string;
    }>;
};

export async function GET(req: Request, { params }: Params) {
    try {
        const { key } = await params;
        if (!key) throw new Error("Key undefined");

        const filePath = path.join(BACKGROUND_DIR_IMAGES, key);

        const imageBuffer = fs.readFileSync(filePath);
        const { size } = fs.statSync(filePath);

        const ext = path.extname(key).toLowerCase();
        const mimeTypes: Record<string, string> = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".avif": "image/avif",
        };
        const contentType = mimeTypes[ext] || "application/octet-stream";

        const headers = new Headers({
            "Content-Type": contentType,
            "Content-Length": size.toString(),
            /* "Content-Disposition": `attachment; filename="${key}"`, */
        });
        const response = new NextResponse(imageBuffer, {
            status: 200,
            headers,
        });
        return response;
    } catch (error: any) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                {
                    status: 500,
                },
            );
        }
    }
}
