"use server";
import { db } from "@/database";
import { transactions } from "../schema/transactions";
import { clients } from "../schema/client";
import { and, asc, between, count, desc, eq, inArray, like, or, sql, sum } from "drizzle-orm";
import { employees } from "../schema/employees";
import { properties } from "../schema/properties";
import { variants } from "../schema/variants";
import { decodeTransactionInput } from "./dto/transactionsDTO";
import { categoryProperties } from "../schema/categoryProperties";
import { BindParameters, FilterPaginationType, LocationStatusType, StartDateEnDateType } from "@/database/types";
import {
    rowCount,
    rowSum,
    selectWithSoftDelete,
    sendToUserActions,
    setDeletedAt,
    withPagination,
} from "./utils/entity";
import { ACTION_NAMES, ENTITIES_ENUM, RENTAL_FILTER_ARRAY, SALES_FILTER_ARRAY } from "../utils";
import {
    ALL_STATUS,
    STATUS_DISPLAY_NAME,
} from "@/app/(private)/tableau-de-board/gestion-des-locations-et-ventes/helpers";

export type insertTransactionType = typeof transactions.$inferInsert;
/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(transactions);

export const insertTransaction = async (values: unknown) => {
    try {
        const inputParsed = decodeTransactionInput(values);

        if (inputParsed.error) {
            throw new Error(inputParsed.error.message);
        }

        const newTransaction = await db.insert(transactions).values(inputParsed.data).$returningId();
        const transaction = await findOneTransaction(newTransaction[0].id);

        const message = `La transaction ${transaction.propertyService} - ${transaction.property} au client ${transaction.client} à été ajouté`;
        await sendToUserActions({
            message,
            action: "create",
            actionName: ACTION_NAMES.transactions.create,
            entity: ENTITIES_ENUM.TRANSACTIONS,
        });

        return transaction;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getTransactionCollection = async (filter: FilterPaginationType & { status?: string[] }) => {
    try {
        const { page, limit, order, search, status } = filter;

        const searchCondition = search
            ? or(
                  like(transactions.keyNumber, sql.placeholder("search")),
                  like(employees.lastName, sql.placeholder("search")),
                  like(employees.firstName, sql.placeholder("search")),
                  like(clients.lastName, sql.placeholder("search")),
                  like(clients.firstName, sql.placeholder("search")),
                  like(clients.phone, sql.placeholder("search")),
                  like(properties.name, sql.placeholder("search")),
                  like(variants.name, sql.placeholder("search")),
                  like(categoryProperties.name, sql.placeholder("search")),
                  like(transactions.propertyService, sql.placeholder("search")),
                  like(transactions.invoice, sql.placeholder("search")),
              )
            : undefined;

        const statusFilter = status && !status?.includes("all") ? (status as LocationStatusType[]) : ALL_STATUS;

        const statusFilterCondition = inArray(transactions.status, statusFilter);

        const query = db
            .select({
                id: transactions.id,
                property: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
                variantID: variants.id,
                seller: sql<string>`CONCAT(${employees.firstName}, " ",${employees.lastName})`,
                employeeID: employees.id,
                client: sql<string>`CONCAT(${clients.firstName}, " ",${clients.lastName})`,
                clientID: clients.id,
                phone: clients.phone,
                price: transactions.sellingPrice,
                propertyService: transactions.propertyService,
                keyQuantity: transactions.keyQuantity,
                keyNumber: transactions.keyNumber,
                transactionDate: transactions.createdAt,
                category: categoryProperties.name,
                invoice: transactions.invoice,
                status: transactions.status,
            })
            .from(transactions)
            .leftJoin(clients, eq(clients.id, transactions.clientID))
            .leftJoin(employees, eq(employees.id, transactions.employeeID))
            .leftJoin(variants, eq(variants.id, transactions.variantID))
            .leftJoin(properties, eq(properties.id, variants.propertyID))
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
            .where(and(softDeleteCondition, statusFilterCondition, searchCondition));
        const parameters: BindParameters = {
            search: `%${search}%`,
            status,
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
            /*         const request = db
                .delete(transactions)
                .where(eq(transactions.id, sql.placeholder("id")))
                .prepare();
            await request.execute({ id }); */
            const transaction = await findOneTransaction(id);
            if (!transaction) continue;
            const request = setDeletedAt(transactions)
                ?.where(eq(transactions.id, sql.placeholder("id")))
                .prepare();
            await request?.execute({ id });

            const message = `La transaction ${transaction.propertyService} - ${transaction.property} au client ${transaction.client} à été supprimé `;
            const extras = {
                id: transaction.id,
            };
            await sendToUserActions({
                message,
                action: "delete",
                actionName: ACTION_NAMES.transactions.delete,
                entity: ENTITIES_ENUM.TRANSACTIONS,
                extras: extras,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const findOneTransaction = async (id: number) => {
    try {
        const transaction = await db
            .select({
                id: transactions.id,
                property: sql<string>`COALESCE(CONCAT(${properties.name}, " - " ,${variants.name}),${properties.name})`,
                variantID: variants.id,
                seller: sql<string>`CONCAT(${employees.lastName}, " ",${employees.firstName})`,
                employeeID: employees.id,
                client: sql<string>`CONCAT(${clients.firstName}, " ",${clients.lastName})`,
                clientID: clients.id,
                phone: clients.phone,
                price: transactions.sellingPrice,
                propertyService: transactions.propertyService,
                invoice: transactions.invoice,
                status: transactions.status,
            })
            .from(transactions)
            .leftJoin(clients, eq(clients.id, transactions.clientID))
            .leftJoin(employees, eq(employees.id, transactions.employeeID))
            .leftJoin(variants, eq(variants.id, transactions.variantID))
            .leftJoin(properties, eq(properties.id, variants.propertyID))
            .where(and(eq(transactions.id, id)));
        return transaction[0];
    } catch (error: any) {
        throw error;
    }
};

export const updateTransaction = async (id: number, values: Partial<insertTransactionType>) => {
    try {
        const transaction = await findOneTransaction(id);
        if (!transaction) throw new Error("Transaction no found");

        const cloneTransaction = { ...transaction, ...values };

        const request = db
            .update(transactions)
            .set(cloneTransaction)
            .where(eq(transactions.id, sql.placeholder("id")))
            .prepare();
        await request.execute({ id });
        const message = `La transaction ${transaction.propertyService} - ${transaction.property} au client ${transaction.client} à été modifié`;
        await sendToUserActions({
            message,
            action: "update",
            actionName: ACTION_NAMES.transactions.update,
            entity: ENTITIES_ENUM.TRANSACTIONS,
        });
    } catch (error: any) {
        throw error;
    }
};

export const updateTransactionStatus = async (id: number, status: LocationStatusType) => {
    const transaction = await findOneTransaction(id);
    if (!transaction) throw new Error("Transaction no found");

    const request = db
        .update(transactions)
        .set({ status })
        .where(eq(transactions.id, sql.placeholder("id")))
        .prepare();
    await request.execute({ id });

    const status_name_old = STATUS_DISPLAY_NAME[transaction.status as LocationStatusType];
    const status_name_new = STATUS_DISPLAY_NAME[status];

    const message = `Le status de la transaction ${transaction.propertyService} - ${transaction.property} à été modifié. \n Le statut est passé de ${status_name_old} à ${status_name_new}.`;
    await sendToUserActions({
        message,
        action: "update",
        actionName: ACTION_NAMES.transactions.status,
        entity: ENTITIES_ENUM.TRANSACTIONS,
    });
};

export const updateMultipleTransactionStatus = async (ids: number[], status: LocationStatusType) => {
    for (const id of ids) {
        try {
            await updateTransactionStatus(id, status);
        } catch (error) {
            reportError(error);
            continue;
        }
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
                  like(transactions.keyNumber, sql.placeholder("search")),
                  like(transactions.invoice, sql.placeholder("search")),
              )
            : undefined;

        let locationTypeCondition: any;
        switch (type?.toLowerCase()) {
            case "vente":
                locationTypeCondition = or(inArray(transactions.propertyService, SALES_FILTER_ARRAY));
                break;
            case "location":
                locationTypeCondition = or(inArray(transactions.propertyService, RENTAL_FILTER_ARRAY));
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
                invoice: transactions.invoice,
                status: transactions.status,
            })
            .from(transactions)
            .leftJoin(clients, eq(clients.id, transactions.clientID))
            .leftJoin(employees, eq(employees.id, transactions.employeeID))
            .leftJoin(variants, eq(variants.id, transactions.variantID))
            .leftJoin(properties, eq(properties.id, variants.propertyID))
            .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
            .where(and(softDeleteCondition, clientCondition, locationTypeCondition, searchCondition))
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
    const total = await rowSum(transactions, transactions.sellingPrice, softDeleteCondition);
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
    const total = await rowCount(transactions, softDeleteCondition);
    const RentalCondition = or(inArray(transactions.propertyService, RENTAL_FILTER_ARRAY));
    const rental = await rowCount(transactions, and(RentalCondition, softDeleteCondition));
    const SaleCondition = or(inArray(transactions.propertyService, SALES_FILTER_ARRAY));
    const sales = await rowCount(transactions, and(SaleCondition, softDeleteCondition));

    return {
        total,
        rental,
        sales,
    };
};

export const statGlobalSecteurTransactionInterval = async (startDate: string, endDate: string) => {
    const totalCondition = between(transactions.createdAt, new Date(startDate), new Date(endDate));
    const SaleCondition = and(
        inArray(transactions.propertyService, SALES_FILTER_ARRAY),
        between(transactions.createdAt, new Date(startDate), new Date(endDate)),
    );
    const RentalCondition = and(
        inArray(transactions.propertyService, RENTAL_FILTER_ARRAY),
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
    const intervalCondition = between(transactions.createdAt, new Date(startDate), new Date(endDate));
    const rentalCondition = or(inArray(transactions.propertyService, RENTAL_FILTER_ARRAY));
    const salesCondition = or(inArray(transactions.propertyService, SALES_FILTER_ARRAY));
    const rentalData = await db
        .select({
            day: sql<string>`WEEKDAY(${transactions.createdAt})`.as("day"),
            total: count(),
        })
        .from(transactions)
        .groupBy(sql<string>`day`)
        .orderBy(asc(sql<string>`day`))
        .where(and(rentalCondition, intervalCondition));

    const salesData = await db
        .select({
            day: sql<string>`WEEKDAY(${transactions.createdAt})`.as("day"),
            total: count(),
        })
        .from(transactions)
        .groupBy(sql<string>`day`)
        .orderBy(asc(sql<string>`day`))
        .where(and(salesCondition, intervalCondition));

    const transactionCount = await statGlobalSecteurTransactionInterval(startDate, endDate);

    const complete = [
        { day: 0, rental: 0, sales: 0 },
        { day: 1, rental: 0, sales: 0 },
        { day: 2, rental: 0, sales: 0 },
        { day: 3, rental: 0, sales: 0 },
        { day: 4, rental: 0, sales: 0 },
        { day: 5, rental: 0, sales: 0 },
        { day: 6, rental: 0, sales: 0 },
    ];

    for (const sale of salesData) {
        const index = Number(sale.day);
        complete[index].sales = complete[index].sales + sale.total;
    }
    for (const rent of rentalData) {
        const index = Number(rent.day);

        complete[index].rental = complete[index].rental + rent.total;
    }

    return {
        rental: transactionCount.rental,
        sales: transactionCount.sales,
        data: complete,
    };
};

export const employeesContribution = async ({
    startDate,
    endDate,
    search,
    page,
    limit,
}: StartDateEnDateType & { search?: string | null; page: number; limit: number }) => {
    const searchCondition = search
        ? or(
              like(transactions.propertyService, sql.placeholder("search")),
              like(properties.name, sql.placeholder("search")),
              like(employees.firstName, sql.placeholder("search")),
              like(employees.lastName, sql.placeholder("search")),
              like(categoryProperties.name, sql.placeholder("search")),
          )
        : undefined;
    const intervalCondition = between(transactions.createdAt, new Date(startDate), new Date(endDate));

    const query = db
        .select({
            seller: sql<string>`CONCAT(${employees.lastName}, " ",${employees.firstName})`.as("seller"),
            totalPrice: sum(transactions.sellingPrice).as("totalSales"),
            totalSalesPrice: sql<number>`SUM(CASE WHEN ${transactions.propertyService} = "Ventes LS" OR ${transactions.propertyService} = "Ventes Favelas" OR ${transactions.propertyService} = "Ventes Blaine County" THEN ${transactions.sellingPrice}  END )`,
            totalRentPrice: sql<number>`SUM(CASE WHEN ${transactions.propertyService} = "Location LS" OR ${transactions.propertyService} = "Location Favelas" OR ${transactions.propertyService} = "Location Blaine County" THEN ${transactions.sellingPrice}  END )`,
            totalSales: sql<number>`COUNT(CASE WHEN ${transactions.propertyService} = "Ventes LS" OR ${transactions.propertyService} = "Ventes Favelas" OR ${transactions.propertyService} = "Ventes Blaine County" THEN ${transactions.propertyService}  END )`,
            totalRent: sql<number>`COUNT(CASE WHEN ${transactions.propertyService} = "Location LS" OR ${transactions.propertyService} = "Location Favelas" OR ${transactions.propertyService} = "Location Blaine County" THEN ${transactions.propertyService}  END )`,
        })
        .from(transactions)
        .leftJoin(employees, eq(employees.id, transactions.employeeID))
        .leftJoin(variants, eq(variants.id, transactions.variantID))
        .leftJoin(properties, eq(properties.id, variants.propertyID))
        .leftJoin(categoryProperties, eq(categoryProperties.id, properties.categoryID))
        .groupBy(sql<string>`seller`)
        .where(and(intervalCondition, searchCondition))
        .$dynamic();

    const parameters: BindParameters = {
        search: `%${search}%`,
    };

    const orderBy = desc(sql<string>`totalSales`);
    const data = await withPagination(query, orderBy, page, limit, parameters);

    const totalItems = data.length || 0;

    const complete = data.map((v) => {
        return {
            ...v,
            totalPrice: Number(v.totalPrice),
            totalSalesPrice: Number(v.totalSalesPrice),
            totalRentPrice: Number(v.totalRentPrice),
        };
    });

    return {
        page,
        totalItems,
        limit,
        data: complete,
    };
};

export const restoreTransaction = async (id: number) => {
    const query = db
        .update(transactions)
        .set({ deletedAt: null })
        .where(eq(transactions.id, sql.placeholder("id")))
        .prepare();
    await query.execute({
        id,
    });
    const transaction = await findOneTransaction(id);
    const message = `La transaction ${transaction.propertyService} - ${transaction.property} au client ${transaction.client} à été restauré.`;
    await sendToUserActions({
        message,
        action: "restore",
        actionName: ACTION_NAMES.transactions.restore,
        entity: ENTITIES_ENUM.TRANSACTIONS,
    });
};

export const restoreTransactions = async (ids: number[]) => {
    if (ids.length > 0) {
        for (const id of ids) {
            await restoreTransaction(id);
        }
    }
};
