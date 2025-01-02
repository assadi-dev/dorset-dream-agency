import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BACKGROUND_DIR_IMAGES } from "@/config/dir";
import { ENV } from "@/config/global";

export const dynamic = "force-dynamic";

type BackgroundFile = {
    name: string;
    url: string;
};

export const GET = async (request: NextRequest) => {
    try {
        const url = ENV.DOMAIN + "/api/announcements/background";
        const fileUrl = `${url}`;
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
