"use server";

import { restoreAnnouncements } from "@/database/drizzle/repositories/announcements";
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

export const restoreAnnouncement = async (ids: number[]) => {
    await restoreAnnouncements(ids);
};

export const restoreVariant = async () => {};

export const restoreProperties = async () => {};
