import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { ENV } from "@/config/global";
import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { plural } from "@/lib/format";
import { insertPhoto } from "@/database/drizzle/repositories/photos";

export async function POST(req: Request) {
    try {
        const UPLOAD_DIR = path.join(ENV.STORAGE_DIR, "images", "properties");
        await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.promises.chmod(UPLOAD_DIR, fs.constants.O_RDWR);
        const formData = await req.formData();
        const files = formData.getAll("files");
        if (!files.length) {
            return NextResponse.json({ message: "No files received." }, { status: 400 });
        }

        const PHOTOS = [];

        for (const file of files as Array<File>) {
            const { fileName, originaleFileName, mimetype, size } = fileNameChange(file);
            const destination = path.join(UPLOAD_DIR, fileName);
            await saveBuffer({
                destination,
                file,
            });

            //Save to database
            const photo = await insertPhoto({
                originaleName: originaleFileName,
                size: size,
                mimeType: mimetype,
                url: `${ENV.DOMAIN}/api/photo/property/${fileName}`,
            });

            PHOTOS.push(photo);
        }

        const FILE_WORD = plural(files.length, "File", "Files");
        const success = {
            message: `${FILE_WORD} uploaded successfully.`,
            photos: PHOTOS,
        };
        return NextResponse.json(success, {
            status: 201,
        });
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
