import { GRANTED_ACTION_PERMISSIONS_MOCK } from "@/mocks/actionsPermissionGranted";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PermissionGrantedRequestBodyInfer } from "../../schema";
import { PATCH as grantedRessourcePermissionApi } from "../../permissions/granted/route";
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
    // await db.delete(rolePermissions);
};

describe("API granted Permissions Integration", () => {
    //beforeAll()
    beforeEach(async () => {
        vi.clearAllMocks();
    });

    describe("Granted all action to à resource without assigner", () => {
        it("Should have resource clients , actionsToAdd must contain all,update,create,delete", async () => {
            const all_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.all;
            const requestBody = {
                actionPermissions: [{ ...all_clients, actionsToAdd: ["all", "update", "create", "delete"] }],
            };

            const request = mockRequest(requestBody as any);

            const actionPermissionsReq = requestBody.actionPermissions[0];
            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToAdd).toContain("all");
            expect(actionPermissionsReq.actionsToAdd).toContain("create");
            expect(actionPermissionsReq.actionsToAdd).toContain("update");
            expect(actionPermissionsReq.actionsToAdd).toContain("delete");
            expect(actionPermissionsReq.actionsToRemove.length).toBeFalsy();
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });

    describe("Remove all action to à resource without assigner", () => {
        it("Should have resource clients and action all, actionsToRemove must contain all", async () => {
            const all_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.removeAll;
            const requestBody = { actionPermissions: [all_clients] };
            const request = mockRequest(requestBody as any);

            const actionPermissionsReq = requestBody.actionPermissions[0];

            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToRemove).toContain("all");
            expect(actionPermissionsReq.actionsToAdd.length).toBeFalsy();
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
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
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
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
            expect(actionPermissionsReq.actionsToRemove).toContain("create");
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });

    describe("Granted  action to à resource with assigner", () => {
        it("Should have resource client and action create, actionsToAdd must contain create", async () => {
            const create_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.create;
            const requestBody = { assigner: 1, actionPermissions: [create_clients as any] };
            const request = mockRequest(requestBody);

            const actionPermissionsReq = requestBody.actionPermissions[0];

            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToAdd).toContain("create");
            expect(actionPermissionsReq.actionsToRemove.length).toBeFalsy();
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
        it("Should have resource client and action create, actionsToRemove must contain create", async () => {
            const create_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.removeCreate;
            const requestBody = { assigner: 1, actionPermissions: [create_clients] };
            const request = mockRequest(requestBody as any);
            const actionPermissionsReq = requestBody.actionPermissions[0];
            expect(actionPermissionsReq.resource).toEqual("clients");
            expect(actionPermissionsReq.actionsToRemove).toContain("create");
            expect(actionPermissionsReq.actionsToAdd.length).toBeFalsy();
            const actionPermissionsRes = await grantedRessourcePermissionApi(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });

    afterAll(async () => {
        await cleanDatabase();
    });
});
