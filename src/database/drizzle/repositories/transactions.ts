"use server";
import { db } from "@/database";
import { transactions } from "../schema/transactions";
import { clients } from "../schema/client";
import { and, asc, between, count, desc, eq, like, or, sql, sum } from "drizzle-orm";
import { employees } from "../schema/employees";
import { properties } from "../schema/properties";
import { variants } from "../schema/variants";
import { decodeTransactionInput } from "./dto/transactionsDTO";
import { categoryProperties } from "../schema/categoryProperties";
import { BindParameters, FilterPaginationType, StartDateEnDateType } from "@/database/types";
import { rowCount, rowSum, withPagination } from "./utils/entity";

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

export const getTransactionCollection = async (filter: FilterPaginationType) => {
    try {
        const { page, limit, order, search } = filter;

        const searchCondition = search
            ? or(
                  like(employees.lastName, sql.placeholder("search")),
                  like(employees.firstName, sql.placeholder("search")),
                  like(clients.lastName, sql.placeholder("search")),
                  like(clients.firstName, sql.placeholder("search")),
                  like(clients.phone, sql.placeholder("search")),
                  like(properties.name, sql.placeholder("search")),
                  like(variants.name, sql.placeholder("search")),
              )
            : undefined;

        const query = db
            .select({
                id: transactions.id,
                property: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
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
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
            .where(searchCondition);
        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        const rowsCount = await query.execute({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const orderByColumn = order === "asc" ? asc(transactions.createdAt) : desc(transactions.createdAt);

        const data = await withPagination(query.$dynamic(), orderByColumn, page, limit, parameters);
        return {
            totalItems,
            limit,
            order,
            data,
        };
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
    filters?: FilterPaginationType;
};

/**
 * Obtenir les transaction lié aux clients
 */
export const getLocationByPropertyType = async ({ id, type, filters }: getLocationByPropertyArgs) => {
    try {
        if (!id) throw new Error("id client missing");

        const { page, limit, order, search } = filters as FilterPaginationType;
        const clientCondition = id ? eq(clients.id, sql.placeholder("id")) : undefined;
        const searchCondition = search
            ? or(
                  like(variants.name, sql.placeholder("search")),
                  like(properties.name, sql.placeholder("search")),
                  like(employees.firstName, sql.placeholder("search")),
                  like(employees.lastName, sql.placeholder("search")),
                  like(categoryProperties.name, sql.placeholder("search")),
              )
            : undefined;

        let locationTypeCondition: any;
        switch (type?.toLowerCase()) {
            case "vente":
                locationTypeCondition = or(
                    eq(transactions.propertyService, "Ventes LS"),
                    eq(transactions.propertyService, "Vente Iles"),
                );
                break;
            case "location":
                locationTypeCondition = or(
                    eq(transactions.propertyService, "Location LS"),
                    eq(transactions.propertyService, "Location Iles"),
                );
                break;
            case "prestige":
                locationTypeCondition = eq(categoryProperties.name, "Prestige");
                break;

            default:
                return undefined;
        }

        const query = db
            .select({
                id: transactions.id,
                property: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
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
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
            .where(and(clientCondition, locationTypeCondition, searchCondition))
            .$dynamic();
        const parameters: BindParameters = {
            id,
            search: `%${search}%`,
        };

        const rowsCount = await query.execute({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const orderColumn = "createdAt";
        const orderBy = order === "asc" ? asc(transactions[orderColumn]) : desc(transactions[orderColumn]);

        const data = await withPagination(query, orderBy, page, limit, parameters);

        return {
            page,
            totalItems,
            limit,
            data,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const statIncomeTransaction = async ({ startDate, endDate }: StartDateEnDateType) => {
    const total = await rowSum(transactions, transactions.sellingPrice);
    const where = between(transactions.createdAt, new Date(startDate), new Date(endDate));
    const sumFromDate = await rowSum(transactions, transactions.sellingPrice, where);
    const percent = Number((sumFromDate / total) * 100).toFixed(2);

    return {
        sum: total,
        difference: {
            sum: sumFromDate,
            percentage: Number(percent),
        },
    };
};
export const statGlobalSecteurTransaction = async () => {
    const total = await rowCount(transactions);
    const RentalCondition = or(
        eq(transactions.propertyService, "Location Iles"),
        eq(transactions.propertyService, "Location LS"),
    );
    const rental = await rowCount(transactions, RentalCondition);
    const SaleCondition = or(
        eq(transactions.propertyService, "Vente Iles"),
        eq(transactions.propertyService, "Ventes LS"),
    );
    const sales = await rowCount(transactions, SaleCondition);

    return {
        total,
        rental,
        sales,
    };
};
export const statGlobalSecteurTransactionInterval = async (startDate: string, endDate: string) => {
    const totalCondition = between(transactions.createdAt, new Date(startDate), new Date(endDate));
    const SaleCondition = and(
        or(eq(transactions.propertyService, "Vente Iles"), eq(transactions.propertyService, "Ventes LS")),
        between(transactions.createdAt, new Date(startDate), new Date(endDate)),
    );
    const RentalCondition = and(
        or(eq(transactions.propertyService, "Location Iles"), eq(transactions.propertyService, "Location LS")),
        between(transactions.createdAt, new Date(startDate), new Date(endDate)),
    );
    const total = await rowCount(transactions, totalCondition);
    const rental = await rowCount(transactions, RentalCondition);
    const sales = await rowCount(transactions, SaleCondition);

    return {
        total,
        rental,
        sales,
    };
};

export const statTransactionPerSecteurChart = async ({ startDate, endDate }: StartDateEnDateType) => {
    const request = await db
        .select({ service: transactions.propertyService, total: sum(transactions.sellingPrice) })
        .from(transactions)
        .groupBy(transactions.propertyService)
        .where(between(transactions.createdAt, new Date(startDate), new Date(endDate)));

    return request.map((value) => {
        return { ...value, total: Number(value.total) };
    });
};
export const statTransactionPerWeekChart = async ({ startDate, endDate }: StartDateEnDateType) => {
    const request = await db
        .select({
            day: sql<string>`WEEKDAY(${transactions.createdAt})`.as("day"),
            total: count(),
        })
        .from(transactions)
        .groupBy(sql<string>`day`)
        .orderBy(asc(sql<string>`day`))
        .where(between(transactions.createdAt, new Date(startDate), new Date(endDate)));

    const transactionCount = await statGlobalSecteurTransactionInterval(startDate, endDate);

    return {
        rental: transactionCount.rental,
        sales: transactionCount.sales,
        data: request,
    };
};
