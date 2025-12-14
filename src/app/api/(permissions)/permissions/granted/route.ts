import { zodJsonResponse } from "@/lib/apihelpers";
import { reportException } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { actionPermissionParser } from "../../schema";

export const PATCH = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();

        const validate = actionPermissionParser.validateBody(requestBody);
        if (validate.error) {
            return zodJsonResponse(validate.error);
        }
        const { assigner, actionPermissions } = validate.data;

        //TODO Implement logic of granted permission actions to ressources

        return NextResponse.json({ message: "permissions granted !" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
