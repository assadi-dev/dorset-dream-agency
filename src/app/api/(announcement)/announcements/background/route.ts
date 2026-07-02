import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BACKGROUND_DIR_IMAGES } from "@/config/dir";

export const dynamic = "force-dynamic";

type BackgroundFile = {
    name: string;
    url: string;
};

export const GET = async (request: NextRequest) => {
    try {
        // Use a relative path so next/image serves it as a same-origin local
        // image instead of routing it through the remote optimizer, which
        // rejects upstreams that resolve to private/loopback IPs (localhost).
        const fileUrl = "/api/announcements/background";
        const backgroundDir = path.join(BACKGROUND_DIR_IMAGES);
        const promise = (): Promise<BackgroundFile[]> =>
            new Promise((resolve) => {
                const backgroundImages: BackgroundFile[] = [];
                fs.readdir(backgroundDir, (err: any, files) => {
                    if (err) throw err;
                    for (const file of files) {
                        const url = `${fileUrl}/${file}`;
                        backgroundImages.push({
                            name: file,
                            url,
                        });
                    }
                    resolve(backgroundImages);
                });
            });

        const result = await promise();

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            },
        );
    }
};
