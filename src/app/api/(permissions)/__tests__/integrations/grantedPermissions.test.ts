import { GRANTED_ACTION_PERMISSIONS_MOCK } from "@/mocks/actionsPermissionGranted";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PermissionGrantedRequestBodyInfer } from "../../schema";
import { PATCH as grantedRessourcePermission } from "../../permissions/granted/route";
import { db } from "~/vitest.setup";
import { rolePermissions } from "@/database/drizzle/schema/rolePermissions";
import { NextRequest } from "next/server";

function mockRequest(body: PermissionGrantedRequestBodyInfer) {
    return new NextRequest("http://localhost/api", {
        method: "PATCH",
        body: JSON.stringify(body),
    });
}

const cleanDatabase = async () => {
    db.delete(rolePermissions);
};

describe("API granted Permissions Integration", () => {
    //beforeAll()
    beforeEach(async () => {
        vi.clearAllMocks();
    });
    describe("Granted  action to à resource without assigner", () => {
        it("Should have resource client and action create, actionsToAdd must contain create", async () => {
            const create_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.create;
            const requestBody = { actionPermissions: [create_clients as any] };
            const request = mockRequest(requestBody);

            const actionPermissionsReq = requestBody.actionPermissions[0];

            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToAdd).toContain("create");
            expect(actionPermissionsReq.actionsToRemove.length).toBeFalsy();
            const actionPermissionsRes = await grantedRessourcePermission(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });
    describe("Remove action to à resource without assigner", () => {
        it("Should have resource client and action, actionsToRemove must contain create", async () => {
            const remove_create_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.removeCreate;
            const requestBody = { actionPermissions: [remove_create_clients as any] };
            const request = mockRequest(requestBody);

            const actionPermissionsReq = requestBody.actionPermissions[0];

            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToAdd.length).toBeFalsy();
            expect(actionPermissionsReq.actionsToRemove).toContain("delete");
            const actionPermissionsRes = await grantedRessourcePermission(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });
    /*     describe("Granted  action to à resource with assigner", () => {});
    describe("Remove action to à resource with assigner", () => {}); */

    afterAll(async () => {
        await cleanDatabase();
    });
});
