import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { UPLOAD_ANNOUNCEMENT_DIR_SAVES } from "@/config/dir";
import { findFileByPath } from "@/database/drizzle/repositories/files";
import { extractKey } from "@/database/drizzle/repositories/announcementsFiles";

export const dynamic = "force-dynamic";

type Params = {
    params: {
        key: string;
    };
};

export async function GET(req: NextRequest, { params: { key } }: Params) {
    try {
        if (!key) throw new Error("Key undefined");

        const filePath = path.join(UPLOAD_ANNOUNCEMENT_DIR_SAVES, key);
        const buffer = fs.readFileSync(filePath);
        const { size } = fs.statSync(filePath);
        const file = await findFileByPath(key);
        const mimeType = file?.mimeType || "application/json";

        const headers = new Headers({
            "Content-Type": mimeType,
            "Content-Length": size.toString(),
        });
        const response = new NextResponse(buffer, {
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
