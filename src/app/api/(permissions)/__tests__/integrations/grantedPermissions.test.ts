import { GRANTED_ACTION_PERMISSIONS_MOCK } from "@/mocks/actionsPermissionGranted";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PermissionGrantedRequestBodyInfer } from "../../schema";
import { NextRequest } from "next/server";
import { PATCH as grantedRessourcePermission } from "../../permissions/granted/route";

const mockRequest = (body: PermissionGrantedRequestBodyInfer) => {
    return new NextRequest("http://localhost", {
        method: "PATCH",
        body: JSON.stringify(body),
    });
};

const cleanDatabase = async () => {
    //TODO Implements clean database
};

describe("API granted Permissions Integration", () => {
    //beforeAll()
    beforeEach(async () => {
        vi.clearAllMocks();
    });
    describe("Granted  action to à ressource without assigner", () => {
        it("Should have ressource client and action create", async () => {
            const create_clients = GRANTED_ACTION_PERMISSIONS_MOCK.clients.create;
            const requestBody = { actionPermissions: [create_clients as any] };
            const request = mockRequest(requestBody);

            const actionPermissionsReq = requestBody.actionPermissions[0];
            expect(actionPermissionsReq.ressource).toEqual("clients");
            expect(actionPermissionsReq.actions).toContain("create");
            const actionPermissionsRes = await grantedRessourcePermission(request);
            expect(actionPermissionsRes?.status).toEqual(200);
            const json = await actionPermissionsRes?.json();
            expect(json).toHaveProperty("message");
        });
    });
    //describe("Remove action to à ressource without assigner", () => {});
    /*     describe("Granted  action to à ressource with assigner", () => {});
    describe("Remove action to à ressource with assigner", () => {}); */

    afterAll(async () => {
        await cleanDatabase();
    });
});
