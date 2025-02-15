"use server";

import { restoreAnnouncements } from "@/database/drizzle/repositories/announcements";
import { restoreClients } from "@/database/drizzle/repositories/clients";
import { restoreEmployees } from "@/database/drizzle/repositories/employee";
import { restoreProperties } from "@/database/drizzle/repositories/properties";
import { restoreTransactions } from "@/database/drizzle/repositories/transactions";
import { restoreAccount } from "@/database/drizzle/repositories/users";
import { restoreVariants } from "@/database/drizzle/repositories/variants";

export const restoreUserAccount = async (userID: number, employeeID: number) => {
    await restoreAccount([userID]);
    await restoreEmployees([employeeID]);
};
export const restoreEmployee = async (userID: number, employeeID: number) => {
    await restoreUserAccount(userID, employeeID);
};
export const restoreTransaction = async (ids: number[]) => {
    await restoreTransactions(ids);
};

export const restoreClient = async (ids: number[]) => {
    await restoreClients(ids);
};

export const restoreAnnouncement = async (ids: number[]) => {
    await restoreAnnouncements(ids);
};

export const restoreVariant = async (ids: number[]) => {
    // TODO: implement restore variant
    await restoreVariants(ids);
};

export const restoreProperty = async (ids: number[]) => {
    // TODO: implement restore properties
    await restoreProperties(ids);
};
