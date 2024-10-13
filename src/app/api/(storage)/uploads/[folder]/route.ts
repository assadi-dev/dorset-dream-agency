import { NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";
import { ENV } from "@/config/global";
import { fileNameChange, saveBuffer } from "@/lib/fileSystem";
import { plural } from "@/lib/format";
import { db } from "@/database";
import { photos } from "@/database/drizzle/schema/photos";
import { sql } from "drizzle-orm";

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

        const PHOTOS = [];

        for (const file of files) {
            const { fileName, originaleFileName, mimetype, size } = fileNameChange(file);
            const destination = path.join(UPLOAD_DIR, fileName);
            await saveBuffer({
                destination,
                file,
            });

            //Save to database
            const prepare = db
                .insert(photos)
                .values({
                    originalName: sql.placeholder("originaleName"),
                    size: sql.placeholder("size"),
                    mimeType: sql.placeholder("mimeType"),
                    url: sql.placeholder("url"),
                })
                .prepare();

            const result = await prepare.execute({
                originaleName: originaleFileName,
                size: size,
                mimeType: mimetype,
                url: `${ENV.DOMAIN}/photo/property/${fileName}`,
            });
            const photo = result[0].insertId;
            PHOTOS.push(photo);
        }

        console.log("upload to image folder: " + folder);

        const FILE_WORD = plural(files.length, "File", "Files");
        const success = {
            message: `${FILE_WORD} uploaded successfully.`,
            photos: PHOTOS,
        };
        return NextResponse.json(success);
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
