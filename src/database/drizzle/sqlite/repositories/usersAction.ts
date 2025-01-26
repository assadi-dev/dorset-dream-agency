import { sqlLite } from "@/database";
import { userActions } from "../schema/userActions";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { withPaginationForSqlite } from "../../repositories/utils/entity";
import { UserActionCreateInputDto, userActionValidator } from "./dto/userAction";

type getUserActionsCollectionsArgs = FilterPaginationType & { from: string; to: string; columns: string[] };
export const getUserActionsCollections = async (filter: getUserActionsCollectionsArgs) => {
    try {
        const { search, page, limit } = filter;

        const query = sqlLite.select().from(userActions).groupBy(userActions.id);
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
        query.where(and(searchCondition));
        const orderbyColumn = desc(userActions.timestamp);
        query.orderBy(orderbyColumn);

        const rowsCount = query.all({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const data = await withPaginationForSqlite(query.$dynamic(), page, limit, parameters);
        console.log(data);

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
