import { restoreAnnouncement, restoreEmployee, restoreUserAccount } from "./actions";

export const restoreFunctions = {
    users: async (payload: { userID: number; employeeID: number }) =>
        restoreUserAccount(payload.userID, payload.employeeID),
    employees: async (payload: { userID: number; employeeID: number }) =>
        restoreEmployee(payload.userID, payload.employeeID),
    announcements: async (payload: { id: number }) => restoreAnnouncement([payload.id]),
    clients: async (payload: { id: number }) => {},
    transactions: async (payload: { id: number }) => {},
    properties: async (payload: any) => {},
    variants: async (payload: any) => {},
};
