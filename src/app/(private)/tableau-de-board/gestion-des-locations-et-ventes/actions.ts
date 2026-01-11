"use server";
import {
    deleteTransactions,
    getTransactionCollection,
    insertTransaction,
    insertTransactionType,
    updateTransaction,
} from "@/database/drizzle/repositories/transactions";
import { LocationVentesFormType } from "./_components/forms/schema";
import { FilterPaginationType } from "@/database/types";

export const createTransaction = async (formData: FormData) => {
    const cleanValues = {
        employeeID: formData.get("employee"),
        clientID: formData.get("client"),
        variantID: formData.get("property"),
        propertyService: formData.get("propertyService"),
        sellingPrice: formData.get("price"),
        keyQuantity: formData.get("keyQuantity"),
        keyNumber: formData.get("keyNumber"),
        status: formData.get("status"),
    };

    await insertTransaction(cleanValues);
};

export const getTransactions = async (filter: FilterPaginationType & { status?: string[] }) => {
    const transactions = await getTransactionCollection(filter);
    return transactions;
};

export const removeTransaction = async (listIds: Array<number>) => {
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
        status: values.status,
    };

    await updateTransaction(id, cleanValues);
};
