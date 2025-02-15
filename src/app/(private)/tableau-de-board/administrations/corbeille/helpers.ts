import { restoreEmployee, restoreUserAccount } from "./actions";

export const restoreFunctions = {
    users: async (payload: { userID: number; employeeID: number }) =>
        restoreUserAccount(payload.userID, payload.employeeID),
    employees: async (payload: { userID: number; employeeID: number }) =>
        restoreEmployee(payload.userID, payload.employeeID),
};
