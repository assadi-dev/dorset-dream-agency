"use server";

import { auth } from "@/auth";
import { ERROR_TITLE_NOTIFY, FORBIDDEN_ACTION } from "@/config/messages";
import {
    declareDeceased,
    deleteAllClient,
    deleteClients,
    getClientsCollections,
    insertClient,
    updateClient,
} from "@/database/drizzle/repositories/clients";
import { FilterPaginationType } from "@/database/types";
import { isAdmin } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const PATH_CLIENTS = "/tableau-de-board/gestion-des-clients";

export const saveClient = async (values: any) => {
    try {
        const newClient = await insertClient(values);
        revalidatePath(PATH_CLIENTS);
        return newClient;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getClientsPaginations = async (filter: FilterPaginationType) => {
    try {
        const collections = await getClientsCollections(filter);
        return collections;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const editClient = async (id: string | number, values: any) => {
    try {
        const client = await updateClient(id, values);
        return client;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const removeClient = async (ids: Array<number>) => {
    try {
        await deleteClients(ids);
        revalidatePath(PATH_CLIENTS);
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const setIsDeadClient = async (ids: number[], value: boolean) => {
    revalidatePath(PATH_CLIENTS);
    return declareDeceased(ids, value);
};

export const emptyClientAction = async () => {
    const session = await auth();
    const role = session?.user?.role;
    try {
        if (!isAdmin(role)) throw new Error(FORBIDDEN_ACTION);
        await deleteAllClient();
        revalidatePath(PATH_CLIENTS);
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
