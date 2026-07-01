"use server";
import {
    deleteTransactions,
    getTransactionCollection,
    insertTransaction,
    insertTransactionType,
    updateMultipleTransactionStatus,
    updateTransaction,
} from "@/database/drizzle/repositories/transactions";
import { LocationVentesFormType } from "./_components/forms/schema";
import { FilterPaginationType, LocationStatusType } from "@/database/types";
import { revalidatePath } from "next/cache";

const TRANSACTION_PATH = "/tableau-de-board/gestion-des-locations-et-ventes";

export const createTransaction = async (formData: FormData) => {
    const cleanValues = {
        employeeID: formData.get("employee"),
        clientID: formData.get("client"),
        variantID: formData.get("property"),
        propertyService: formData.get("propertyService"),
        sellingPrice: formData.get("price"),
        keyQuantity: formData.get("keyQuantity"),
        keyNumber: formData.get("keyNumber"),
        invoice: formData.get("invoice"),
        status: formData.get("status"),
    };

    revalidatePath(TRANSACTION_PATH);
    await insertTransaction(cleanValues);
};

export const getTransactions = async (filter: FilterPaginationType & { status?: string[] }) => {
    const transactions = await getTransactionCollection(filter);
    return transactions;
};

export const removeTransaction = async (listIds: Array<number>) => {
    revalidatePath(TRANSACTION_PATH);
    await deleteTransactions(listIds);
};

export const ediTransaction = async (id: number, values: Partial<LocationVentesFormType>) => {
    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: Number(values.client),
        variantID: Number(values.property),
        propertyService: values.propertyService,
        sellingPrice: values.price,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
        invoice: values.invoice,
        status: values.status,
    };

    revalidatePath(TRANSACTION_PATH);
    await updateTransaction(id, cleanValues);
};


export const updateTransactionStatus = async (ids: number[], status: LocationStatusType) => {
    revalidatePath(TRANSACTION_PATH);
    await updateMultipleTransactionStatus(ids, status);

};