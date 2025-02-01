"use server";

import {
    declareDeceased,
    deleteClients,
    getClientsCollections,
    insertClient,
    updateClient,
} from "@/database/drizzle/repositories/clients";
import { FilterPaginationType } from "@/database/types";

export const saveClient = async (values: any) => {
    try {
        const newClient = await insertClient(values);
        return newClient;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getClientsPaginations = async (filter: FilterPaginationType) => {
    try {
        const collections = await getClientsCollections(filter);
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
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const setIsDeadClient = async (ids: number[], value: boolean) => {
    return declareDeceased(ids, value);
};
