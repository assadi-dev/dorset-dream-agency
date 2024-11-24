"use server";
import {
    deleteTransactions,
    getTransactionCollection,
    insertTransaction,
    insertTransactionType,
    updateTransaction,
} from "@/database/drizzle/repositories/transactions";
import { LocationVentesFormType } from "./_components/forms/schema";

export const createTransaction = async (formData: FormData) => {
    const cleanValues = {
        employeeID: formData.get("employee"),
        clientID: formData.get("client"),
        variantID: formData.get("property"),
        propertyService: formData.get("propertyService"),
        sellingPrice: formData.get("price"),
        keyQuantity: formData.get("keyQuantity"),
        keyNumber: formData.get("keyNumber"),
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

export const ediTransaction = async (id: number, values: Partial<LocationVentesFormType>) => {
    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: Number(values.client),
        variantID: Number(values.property),
        propertyService: values.propertyService,
        sellingPrice: values.price,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
    };

    await updateTransaction(id, cleanValues);
};
