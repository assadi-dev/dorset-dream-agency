"use server";

import {
    getTransactionCollection,
    insertTransaction,
    insertTransactionType,
} from "@/database/drizzle/repositories/transactions";
import { LocationVentesFormType } from "./_components/forms/schema";

export const createTransaction = async (values: LocationVentesFormType) => {
    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: values.client,
        variantID: values.property,
        propertyService: values.propertyService,
        sellingPrice: values.sellingPrice,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
    };
    await insertTransaction(cleanValues);
};

export const getTransactions = async () => {
    const transactions = await getTransactionCollection();
    return transactions;
};
