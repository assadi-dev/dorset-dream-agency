import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { UPLOAD_DIR_PERQUISITION } from "@/config/dir";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        key: string;
    };
};

export async function GET(req: Request, { params: { key } }: Params) {
    try {
        if (!key) throw new Error("Key undefined");

        const filePath = path.join(UPLOAD_DIR_PERQUISITION, key);
        const imageBuffer = fs.readFileSync(filePath);
        const { size } = fs.statSync(filePath);

        const headers = new Headers({
            "Content-Type": "image/jpeg",
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
