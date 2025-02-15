import {
    restoreAnnouncement,
    restoreClient,
    restoreEmployee,
    restoreProperty,
    restoreUserAccount,
    restoreVariant,
} from "./actions";

export const restoreFunctions = {
    users: async (payload: { userID: number; employeeID: number }) =>
        restoreUserAccount(payload.userID, payload.employeeID),
    employees: async (payload: { userID: number; employeeID: number }) =>
        restoreEmployee(payload.userID, payload.employeeID),
    announcements: async (payload: { id: number }) => restoreAnnouncement([payload.id]),
    clients: async (payload: { id: number }) => restoreClient([payload.id]),
    properties: async (payload: { id: number }) => restoreProperty([payload.id]),
    variants: async (payload: { id: number }) => restoreVariant([payload.id]),
    transactions: async (payload: { id: number }) => {},
};
