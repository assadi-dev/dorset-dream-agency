import { zodJsonResponse } from "@/lib/apihelpers";
import { reportException } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { actionPermissionParser } from "../../schema";
import { grantedActionsToRoleMultiple } from "@/database/drizzle/repositories/rolePermission";

export const PATCH = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();

        const validate = actionPermissionParser.validateBody(requestBody);
        if (validate.error) {
            return zodJsonResponse(validate.error);
        }
        const { assigner, actionPermissions } = validate.data;
        await grantedActionsToRoleMultiple(actionPermissions);

        return NextResponse.json({ message: "permissions granted !" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
