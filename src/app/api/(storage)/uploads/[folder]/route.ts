import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { ENV } from "@/config/global";

type Params = {
    params: {
        folder: string;
    };
};

export async function POST(req: Request, { params: { folder } }: Params) {
    try {
        const UPLOAD_DIR = path.join(ENV.STORAGE_DIR, "images", folder);
        await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR, fs.constants.O_RDWR);
        const formData = await req.formData();
        const files = formData.getAll("files");
        if (!files.length) {
            return NextResponse.json({ message: "No files received." }, { status: 400 });
        }

        console.log("upload to image folder");
        console.log("files", files);

        return NextResponse.json("coucou");
    } catch (error) {
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
