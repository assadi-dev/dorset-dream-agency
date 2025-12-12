import { zodJsonResponse } from "@/lib/apihelpers";
import { reportException } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        /*      const validate = createMessageParser.validate(requestBody);
               if (validate.error) {
                   return zodJsonResponse(validate.error);
               } */
        console.log("content body", requestBody);

        return NextResponse.json({ message: "roles assign" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
