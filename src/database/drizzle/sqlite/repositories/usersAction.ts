import { sqlLite } from "@/database";
import { userActions } from "../schema/userActions";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { and, between, desc, eq, getTableColumns, inArray, like, or, sql } from "drizzle-orm";
import { withPaginationForSqlite } from "../../repositories/utils/entity";
import { UserActionCreateInputDto, userActionValidator } from "./dto/userAction";
import { UserActionUnion } from "@/types/global";

type getUserActionsCollectionsArgs = FilterPaginationType & {
    from: string;
    to: string;
    actionsType: UserActionUnion[];
};
export const getUserActionsCollections = async (filter: getUserActionsCollectionsArgs) => {
    try {
        const { search, page, limit, actionsType, from, to } = filter;
        const query = sqlLite
            .select({
                ...getTableColumns(userActions),
                createdAt: sql<number>`strftime('%s', ${userActions.timestamp})`.as("createdAt"),
            })
            .from(userActions)
            .groupBy(userActions.id);
        const searchCondition = search
            ? or(
                  like(userActions.user, sql.placeholder("search")),
                  like(userActions.grade, sql.placeholder("search")),
                  like(userActions.action, sql.placeholder("search")),
                  like(userActions.name, sql.placeholder("search")),
              )
            : undefined;

        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        const startDate = new Date(from);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(to);
        endDate.setHours(23, 59, 59);

        const startTimestamp = startDate.toISOString();
        const endTimestamp = endDate.toISOString();
        const rangeCondition = between(
            sql<number>`strftime('%s', ${userActions.timestamp})`,
            sql<number>`strftime('%s', ${startTimestamp})`,
            sql<number>`strftime('%s', ${endTimestamp})`,
        );

        query.where(and(searchCondition, inArray(userActions.action, actionsType), rangeCondition));
        const orderbyColumn = desc(userActions.timestamp);
        query.orderBy(orderbyColumn);

        const rowsCount = query.all({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const data = await withPaginationForSqlite(query.$dynamic(), page, limit, parameters);

        return {
            page,
            totalItems,
            limit,
            data,
        };
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
export const insertUserAction = async (inputs: UserActionCreateInputDto) => {
    try {
        const validateInput = userActionValidator(inputs);
        if (validateInput.error) throw validateInput.error;

        const result = await sqlLite.insert(userActions).values({
            user: validateInput.data.user,
            grade: validateInput.data.grade,
            action: validateInput.data.action,
            name: validateInput.data.name,
            description: validateInput.data.description,
            entity: validateInput.data.entity,
        });
        const id = result.lastInsertRowid as number;
        return await findUserAction(id);
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const findUserAction = async (id: number) => {
    try {
        const prepare = sqlLite
            .select()
            .from(userActions)
            .where(eq(userActions.id, sql.placeholder("id")))
            .prepare();
        const result = await prepare.execute({
            id,
        });
        return result[0];
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const deleteUserAction = async (ids: number[]) => {
    try {
        for (const id of ids) {
            const prepare = sqlLite
                .delete(userActions)
                .where(eq(userActions.id, sql.placeholder("id")))
                .prepare();
            await prepare.execute({
                id,
            });
        }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
