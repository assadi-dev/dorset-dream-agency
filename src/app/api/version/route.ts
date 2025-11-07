import { NextRequest, NextResponse } from "next/server";
import packageJson from "../../../../package.json";
import { validateVersionSchema } from "./schema";
import { zodParserError } from "@/lib/parser";
import { updateVersionFile } from "./utils";

export const GET = async () => {
    try {
        const packageVersions = {
            name: packageJson.name,
            version: packageJson.version,
        };

        return NextResponse.json(packageVersions);
    } catch (error) {
        return NextResponse.json({ message: "" }, { status: 500 });
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const validate = validateVersionSchema.versionInput(requestBody);
        if (validate.error) {
            const invalidInput = zodParserError(validate.error);
            return NextResponse.json({ message: "invalide input", path: invalidInput }, { status: 400 });
        }

        updateVersionFile(validate.data.version);

        const packageVersions = {
            name: packageJson.name,
            version: validate.data.version,
        };

        return NextResponse.json(packageVersions);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "" }, { status: 500 });
        }
    }
};
