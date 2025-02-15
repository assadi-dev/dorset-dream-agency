"use server";

import { restoreEmployees } from "@/database/drizzle/repositories/employee";
import { restoreAccount } from "@/database/drizzle/repositories/users";

export const restoreUserAccount = async (userID: number, employeeID: number) => {
    await restoreAccount([userID]);
    await restoreEmployees([employeeID]);
};
export const restoreEmployee = async (userID: number, employeeID: number) => {
    restoreUserAccount(userID, employeeID);
};
export const restoreTransaction = async () => {};

export const restoreClient = async () => {};

export const restoreAnnouncement = async () => {};

export const restoreVariant = async () => {};

export const restoreProperties = async () => {};
