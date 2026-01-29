import { NextRequest, NextResponse } from "next/server";
import { updateReleaseFile } from "../version/utils";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        await updateReleaseFile(body);
        return NextResponse.json({ message: "release.json has been updated with success !" });
    } catch (error) {
        if (error instanceof Error) {
            NextResponse.json({ erreur: error.message }, { status: 500 });
        }
    }
};
