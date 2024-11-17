import { insertPerquisition } from "@/database/drizzle/repositories/perquisitions";
import { uploadPhotoPerquisition } from "@/database/drizzle/repositories/perquisitionsToPhotos";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const employeeID = Number(formData.get("employeeID"));
        const clientID = Number(formData.get("clientID"));

        const perquisition = await insertPerquisition({ employeeID, clientID });
        formData.append("perquisitionID", String(perquisition.id));
        const result = await uploadPhotoPerquisition(formData);

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
