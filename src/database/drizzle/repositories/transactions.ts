"use server";
import { db } from "@/database";
import { transactions } from "../schema/transactions";
import { clients } from "../schema/client";
import { and, eq, or, sql } from "drizzle-orm";
import { employees } from "../schema/employees";
import { properties } from "../schema/properties";
import { variants } from "../schema/variants";
import { decodeTransactionInput } from "./dto/transactionsDTO";
import { categoryProperties } from "../schema/categoryProperties";

export type insertTransactionType = typeof transactions.$inferInsert;

export const insertTransaction = async (values: unknown) => {
    try {
        const inputParsed = decodeTransactionInput(values);

        if (inputParsed.error) {
            throw new Error(inputParsed.error.message);
        }

        const transaction = await db.insert(transactions).values(inputParsed.data);
        return transaction;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getTransactionCollection = async () => {
    try {
        const result = db
            .select({
                id: transactions.id,
                property: sql<string>`CONCAT(${properties.name}, " - ",${variants.name})`,
                variantID: variants.id,
                seller: sql<string>`CONCAT(${employees.lastName}, " ",${employees.firstName})`,
                employeeID: employees.id,
                client: sql<string>`CONCAT(${clients.lastName}, " ",${clients.firstName})`,
                clientID: clients.id,
                phone: clients.phone,
                price: transactions.sellingPrice,
                propertyService: transactions.propertyService,
                keyQuantity: transactions.keyQuantity,
                keyNumber: transactions.keyNumber,
                transactionDate: transactions.createdAt,
                category: categoryProperties.name,
            })
            .from(transactions)
            .leftJoin(clients, eq(clients.id, transactions.clientID))
            .leftJoin(employees, eq(employees.id, transactions.employeeID))
            .leftJoin(variants, eq(variants.id, transactions.variantID))
            .leftJoin(properties, eq(properties.id, variants.propertyID))
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID));

        return await result;
    } catch (error: any) {
        throw error;
    }
};

/**
 *
 * Suppression multiple des transaction
 */
export const deleteTransactions = async (ids: Array<number>) => {
    try {
        for (const id of ids) {
            const request = db
                .delete(transactions)
                .where(eq(transactions.id, sql.placeholder("id")))
                .prepare();
            await request.execute({ id });
        }
    } catch (error: any) {
        throw error;
    }
};

export const findOneTransaction = async () => {
    try {
        const transaction = await db.select().from(transactions);
    } catch (error: any) {
        throw error;
    }
};

export const updateTransaction = async (id: number, values: Partial<insertTransactionType>) => {
    try {
        const transaction = await db.select().from(transactions).where(eq(transactions.id, id));
        if (!transaction) throw new Error("Transaction no found");

        const cloneTransaction = { ...transaction, ...values };

        const request = db
            .update(transactions)
            .set(cloneTransaction)
            .where(eq(transactions.id, sql.placeholder("id")))
            .prepare();
        await request.execute({ id });
    } catch (error: any) {
        throw error;
    }
};

type getLocationByPropertyArgs = {
    id?: number | string;
    type?: string;
};

/**
 * Obtenir les transaction lié aux clients
 */
export const getLocationByPropertyType = async ({ id, type }: getLocationByPropertyArgs) => {
    try {
        if (!id) throw new Error("id client missing");

        const prepare = db
            .select({
                id: transactions.id,
                property: sql<string>`CONCAT(${properties.name}, " - ",${variants.name})`,
                variantID: variants.id,
                seller: sql<string>`CONCAT(${employees.lastName}, " ",${employees.firstName})`,
                employeeID: employees.id,
                client: sql<string>`CONCAT(${clients.lastName}, " ",${clients.firstName})`,
                clientID: clients.id,
                phone: clients.phone,
                price: transactions.sellingPrice,
                propertyService: transactions.propertyService,
                keyQuantity: transactions.keyQuantity,
                keyNumber: transactions.keyNumber,
                transactionDate: transactions.createdAt,
                category: categoryProperties.name,
            })
            .from(transactions)
            .leftJoin(clients, eq(clients.id, transactions.clientID))
            .leftJoin(employees, eq(employees.id, transactions.employeeID))
            .leftJoin(variants, eq(variants.id, transactions.variantID))
            .leftJoin(properties, eq(properties.id, variants.propertyID))
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID));

        switch (type?.toLocaleLowerCase()) {
            case "location":
                prepare.where(
                    and(
                        eq(clients.id, sql.placeholder("id")),
                        or(
                            eq(transactions.propertyService, "Location LS"),
                            eq(transactions.propertyService, "Location Iles"),
                        ),
                    ),
                );
                break;

            case "vente":
                prepare.where(
                    and(
                        eq(clients.id, sql.placeholder("id")),
                        or(
                            eq(transactions.propertyService, "Ventes LS"),
                            eq(transactions.propertyService, "Vente Iles"),
                        ),
                    ),
                );

                break;
            case "prestige":
                prepare.where(and(eq(clients.id, sql.placeholder("id")), eq(categoryProperties.name, "Prestige")));

                break;

            default:
                break;
        }

        const result = await prepare.execute({
            id,
        });
        return await result;
    } catch (error) {}
};
