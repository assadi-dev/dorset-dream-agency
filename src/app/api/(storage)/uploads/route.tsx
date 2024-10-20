import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { ENV } from "@/config/global";

export async function POST(req: Request) {
    try {
        const UPLOAD_DIR = path.join(ENV.STORAGE_DIR);
        await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR, fs.constants.O_RDWR);
        const formData = await req.formData();
        const files = formData.getAll("files");
        if (!files.length) {
            return NextResponse.json({ message: "No files received." }, { status: 400 });
        }

        console.log("UPLOAD_DIR", UPLOAD_DIR);
        console.log("upload storage");
        // console.log("files", files);

        return NextResponse.json("coucou");
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
