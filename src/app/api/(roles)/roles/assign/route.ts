import { zodJsonResponse } from "@/lib/apihelpers";
import { reportException } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { assignRequestParser } from "../../schema";
import { assignMultipleUser } from "@/database/drizzle/repositories/userRole";
import { UpdateUserRoleInputs } from "@/database/drizzle/repositories/dto/userRoleDTO";

export const PATCH = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const validate = assignRequestParser.validate(requestBody);
        if (validate.error) {
            return zodJsonResponse(validate.error);
        }
        const { roleId, users, assignerId, newRoleId } = validate.data;
        const values: UpdateUserRoleInputs[] = users.map((id) => ({
            userId: id,
            roleId,
            assignedBy: assignerId,
            newRoleId: newRoleId,
        }));

        await assignMultipleUser(values);

        return NextResponse.json({ message: "role assigned", rows: values.length }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            reportException(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
