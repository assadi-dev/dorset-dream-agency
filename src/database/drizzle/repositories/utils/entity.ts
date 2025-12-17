import { db } from "@/database";
import { BindParameters } from "@/database/types";
import { count, isNull, SQL, SQLWrapper, sum } from "drizzle-orm";
import { MySqlColumn, MySqlSelect, MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { SQLiteSelect } from "drizzle-orm/sqlite-core";
import { ENTITIES_ENUM, generateDescriptionForUserAction } from "../../utils";
import { auth } from "@/auth";
import { insertUserAction } from "../../sqlite/repositories/usersAction";
import { UserActionUnion } from "@/types/global";

export function withPagination<T extends MySqlSelect>(
    qb: T,
    orderByColumn: MySqlColumn | SQL | SQL.Aliased,
    page = 1,
    limit = 5,
    bindParams?: BindParameters,
) {
    const query = qb
        .orderBy(orderByColumn)
        .limit(limit)
        .offset((page - 1) * limit);
    if (bindParams) {
        return query.prepare().execute({
            ...bindParams,
        });
    }

    return query;
}

export function withPaginationForSqlite<T extends SQLiteSelect>(
    qb: T,
    page = 1,
    limit = 5,
    bindParams?: BindParameters,
) {
    const query = qb.limit(limit).offset((page - 1) * limit);
    if (bindParams) {
        return query.prepare().execute({
            ...bindParams,
        });
    }

    return query;
}

export async function rowCount(table: MySqlTableWithColumns<any>, where?: any) {
    const query = db.select({ count: count() }).from(table);
    if (where) {
        query.where(where);
    }
    const result = await query;
    return result[0].count;
}

export async function rowSum(table: MySqlTableWithColumns<any>, column: SQLWrapper, where?: any) {
    const query = db.select({ sum: sum(column) }).from(table);
    if (where) {
        query.where(where);
    }
    const result = await query;
    return Number(result[0].sum);
}

export function hasDeletedAtColumn(table: MySqlTableWithColumns<any>): boolean {
    return "deletedAt" in table;
}

export function selectWithSoftDelete(table: MySqlTableWithColumns<any>) {
    if (hasDeletedAtColumn(table)) {
        return isNull(table["deletedAt"]);
    }
    return undefined;
}

export const setDeletedAt = (table: MySqlTableWithColumns<any>) => {
    if (hasDeletedAtColumn(table)) {
        return db
            .update(table)
            .set({
                deletedAt: new Date(),
            })
            .$dynamic();
    }
    return undefined;
};

export async function generateDescription(message: string, extras?: any) {
    try {
        const session = await auth();

        const description = await generateDescriptionForUserAction({
            session: session || null,
            message: message,
            extras: extras,
        });
        return description;
    } catch (error) {}
}

type insertUserActionArgs = {
    message: string;
    action: UserActionUnion;
    entity: string;
    actionName: string;
    extras?: any;
};

/**
 * Method qui permet de créer une entrée dans la bdd contenant les action des utilisateur
 *
 */
export const sendToUserActions = async ({ message, action, entity, actionName, extras }: insertUserActionArgs) => {
    const description = await generateDescription(message, extras);

    if (description) {
        await insertUserAction({
            user: description.user as string,
            action: action,
            name: actionName,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: entity,
        });
    }
};
