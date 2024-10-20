"use server";

import {
    deleteTransactions,
    getTransactionCollection,
    insertTransaction,
    insertTransactionType,
    updateTransaction,
} from "@/database/drizzle/repositories/transactions";
import { LocationVentesFormType } from "./_components/forms/schema";

export const createTransaction = async (values: LocationVentesFormType) => {
    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: values.client,
        variantID: values.property,
        propertyService: values.propertyService,
        sellingPrice: values.price,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
    };
    await insertTransaction(cleanValues);
};

export const getTransactions = async () => {
    const transactions = await getTransactionCollection();
    return transactions;
};

export const removeTransaction = async (listIds: Array<number>) => {
    await deleteTransactions(listIds);
};

export const ediTransaction = async (id: number, values: Partial<insertTransactionType>) => {
    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: values.client,
        variantID: values.property,
        propertyService: values.propertyService,
        sellingPrice: values.price,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
    };

    await updateTransaction(id, cleanValues);
};
