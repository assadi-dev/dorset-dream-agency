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
import { taxSchema } from "@/database/drizzle/repositories/dto/transactionsDTO";

const TRANSACTION_PATH = "/tableau-de-board/gestion-des-locations-et-ventes";


const parseTaxes = (formData: FormData) => {

    if (!formData.get("taxes")) return [];
    const taxes = []
    for (const tax of formData.getAll("taxes")) {
        try {
            const taxObj = taxSchema.safeParse(JSON.parse(tax as string));
            if (taxObj.success) {
                taxes.push(taxObj.data);
            }
        } catch {
            continue;
        }
    }
    return taxes;
}

const  sumTaxes = (taxes: Array<{ id: number; name: string; rate: number }>) => {
    return taxes.reduce((acc, tax) => Number(acc) + Number(tax.rate || 0), 0);
}



export const createTransaction = async (formData: FormData) => {
    const taxes = parseTaxes(formData);
    const totalTaxes = sumTaxes(taxes);
    const cleanValues = {
        employeeID: formData.get("employee"),
        clientID: formData.get("client"),
        variantID: formData.get("property"),
        propertyService: formData.get("propertyService"),
        sellingPrice: Number(formData.get("unitPrice")) + Number(totalTaxes),
        keyQuantity: formData.get("keyQuantity"),
        keyNumber: formData.get("keyNumber"),
        invoice: formData.get("invoice"),
        status: formData.get("status"),
        unitPrice: formData.get("unitPrice"),
        taxes: taxes,
    };

    revalidatePath(TRANSACTION_PATH);
    await insertTransaction(cleanValues);
};

export const getTransactions = async (filter: FilterPaginationType & { status?: string[], category?: number[] }) => {
    const transactions = await getTransactionCollection(filter);
    return transactions;
};

export const removeTransaction = async (listIds: Array<number>) => {
    revalidatePath(TRANSACTION_PATH);
    await deleteTransactions(listIds);
};

export const ediTransaction = async (id: number, values: Partial<LocationVentesFormType>) => {
        const taxes = values.taxes?.map((tax) => {
            return {
                id: Number(tax.id),
                name: tax.name,
                rate: Number(tax.rate),
            };
        }) as {id: number; name: string; rate: number}[] || [];
    const totalTaxes = sumTaxes(taxes);

    const cleanValues: insertTransactionType = {
        employeeID: values.employee,
        clientID: Number(values.client),
        variantID: Number(values.property),
        propertyService: values.propertyService,
        sellingPrice: Number(values.price) + Number(totalTaxes),
        unitPrice: values.price,
        keyQuantity: values.keyQuantity,
        keyNumber: values.keyNumber,
        invoice: values.invoice,
        status: values.status,
        taxes: taxes,
    };

    revalidatePath(TRANSACTION_PATH);
    await updateTransaction(id, cleanValues);
};


export const updateTransactionStatus = async (ids: number[], status: LocationStatusType) => {
    revalidatePath(TRANSACTION_PATH);
    await updateMultipleTransactionStatus(ids, status);

};