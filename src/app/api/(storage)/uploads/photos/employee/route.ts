import { uploadPhotoEmployee } from "@/database/drizzle/repositories/employeeFIle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        if (!formData.get("employeeID")) throw new Error("employeeID manquante");
        const files = formData.getAll("files");
        if (!files.length) {
            return NextResponse.json({ message: "No files received." }, { status: 400 });
        }

        const result = await uploadPhotoEmployee(formData);

        return NextResponse.json(result, {
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
};
