"use server";

import { restoreEmployees } from "@/database/drizzle/repositories/employee";
import { restoreAccount } from "@/database/drizzle/repositories/users";

export const restoreUserAccount = async (idUser: number, idEmployee: number) => {
    await restoreAccount([idUser]);
    await restoreEmployees([idEmployee]);
};
export const restoreEmployee = async (idUser: number, idEmployee: number) => {
    restoreUserAccount(idUser, idEmployee);
};
export const restoreTransaction = async () => {};

export const restoreClient = async () => {};

export const restoreAnnouncement = async () => {};

export const restoreVariant = async () => {};

export const restoreProperties = async () => {};
