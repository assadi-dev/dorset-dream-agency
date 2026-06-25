import { db } from "@/database";
import { categoryProperties } from "../schema/categoryProperties";
import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { FilterPaginationType } from "@/database/types";
import { sendToUserActions, withPagination } from "./utils/entity";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { UserActionUnion } from "@/types/global";

type CategoryPropertyInputsType = {
    name: string;

};

export const getCategoriesForOptions = async () => {
    const result = await db
        .select({
            id: categoryProperties.id,
            label: categoryProperties.name,
            value: sql`lower(${categoryProperties.id})`,
        })
        .from(categoryProperties)
        .orderBy(desc(categoryProperties.createdAt));
    return result;
};

export const getCategoriesCollections = async () => {
    const result = await db.select().from(categoryProperties).orderBy(desc(categoryProperties.createdAt));
    return result;
};

export const getCategoriesPaginate = async (filter: FilterPaginationType) => {
    const {page,limit,search} = filter;
    const searchCondition = search
            ? or(
                  ilike(categoryProperties.name, sql.placeholder("search")),
              )
            : undefined;
    const query =  db.select({
        id: categoryProperties.id,
        name: categoryProperties.name,
        createdAt: categoryProperties.createdAt,

    }).from(categoryProperties).where(and(searchCondition))

    const order = desc(categoryProperties.createdAt);

     const parameters = search
            ? {
                  search: `%${search}%`,
              }
            : undefined;

        const rowsCount = await query.execute({
            ...parameters,
        });



        const data = await withPagination(query.$dynamic(), order, page, limit, parameters);
        const totalItems = rowsCount.length || 0;
 
    return {
            totalItems,
            limit,
            data,
        };
};


export const getCategoryByName = async (name: string) => {
    const prepare = db
        .select()
        .from(categoryProperties)
        .where(eq(categoryProperties.name, sql.placeholder("name")))
        .prepare();
    const result = await prepare.execute({
        name,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${name} is not found in database`);
};


export const getCategoryByID = async (id: string) => {
    const prepare = db
        .select()
        .from(categoryProperties)
        .where(eq(categoryProperties.id, sql.placeholder("id")))
        .prepare();
    const result = await prepare.execute({
        id,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${id} is not found in database`);
};

export const updateCategory = async (id: string, inputs: Partial<CategoryPropertyInputsType>) => {
    const prepare = db
        .update(categoryProperties)
        .set(inputs)
        .where(eq(categoryProperties.id, sql.placeholder("id")))
        .prepare();
    const result = await prepare.execute({
        id,
    });
    const message = `Modification de la catégorie ${inputs.name}`;
    const extras = { id,inputs };
    await sendToUserActions({
        message,
        action: "update",
        entity: ENTITIES_ENUM.CATEGORY_PROPERTIES,
        actionName: ACTION_NAMES.categoryProperties.create,
        extras,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${id} is not found in database`);
};

export const deleteCategory = async (id: string) => {
    const prepare = db
        .delete(categoryProperties)
        .where(eq(categoryProperties.id, sql.placeholder("id")))
        .prepare();
    const result = await prepare.execute({
        id,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${id} is not found in database`);
};

export const deleteManyCategory = async (ids: Array<string>) => {
    const prepare = db
        .delete(categoryProperties)
        .where(inArray(categoryProperties.id, sql.placeholder("ids")))
        .prepare();
    await prepare.execute({
        ids,
    });

        const result = await prepare.execute();
    const message = `Suppression des catégories`;
    const extras = { ids };
    await sendToUserActions({
        message,
        action: "delete",
        entity: ENTITIES_ENUM.CATEGORY_PROPERTIES,
        actionName: ACTION_NAMES.categoryProperties.create,
        extras,
    });
   
};

export const insertCategory = async (inputs: CategoryPropertyInputsType) => {
    const prepare = db
        .insert(categoryProperties)
        .values(inputs)
        .prepare();
    const result = await prepare.execute();
    const message = `Ajout du catégorie ${inputs.name}`;
    await sendToUserActions({
        message,
        action: "create",
        entity: ENTITIES_ENUM.CATEGORY_PROPERTIES,
        actionName: ACTION_NAMES.categoryProperties.create,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${inputs.name} is not found in database`);
};

