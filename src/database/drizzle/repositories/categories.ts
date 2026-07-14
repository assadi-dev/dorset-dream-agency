import { db } from "@/database";
import { categoryProperties } from "../schema/categoryProperties";
import { and, asc, desc, eq, gt, gte, inArray, isNull, like, lt, lte, or, sql } from "drizzle-orm";
import { FilterPaginationType } from "@/database/types";
import { sendToUserActions, withPagination } from "./utils/entity";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { UserActionUnion } from "@/types/global";
import { properties } from "../schema/properties";

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
        .where(eq(categoryProperties.isVisible, true))
        .orderBy(asc(categoryProperties.orderPosition));
    return result;
};

export const getCategoriesCollections = async () => {
    const result = await db.select().from(categoryProperties).orderBy(asc(categoryProperties.orderPosition));
    return result;
};

export const getCategoriesPaginate = async (filter: FilterPaginationType) => {
    const {page,limit,search} = filter;
    const searchCondition = search
            ? or(
                  like(categoryProperties.name, sql.placeholder("search")),
              )
            : undefined;
    const query =  db.select({
        id: categoryProperties.id,
        name: categoryProperties.name,
        count: sql<number>`count(${properties.id})`.mapWith(Number),
        isVisible: categoryProperties.isVisible,
        orderPosition: categoryProperties.orderPosition,
        createdAt: categoryProperties.createdAt,

    })
        .from(categoryProperties)
        .leftJoin(properties, and(eq(properties.categoryID, categoryProperties.id), isNull(properties.deletedAt)))
        .where(and(searchCondition))
        .groupBy(categoryProperties.id)

    const order = asc(categoryProperties.orderPosition);

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
        .where(and(eq(categoryProperties.name, sql.placeholder("name")), eq(categoryProperties.isVisible, true)))
        .orderBy(asc(categoryProperties.orderPosition))
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
        .where(and(eq(categoryProperties.id, sql.placeholder("id")), eq(categoryProperties.isVisible, true)))
        .orderBy(asc(categoryProperties.orderPosition))
        .prepare();
    const result = await prepare.execute({
        id,
    });
    if (result.length > 0) return result[0];
    throw new Error(`Category ${id} is not found in database`);
};

export const isCategoryExist = async (id: string) => {
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

export const updateCategory = async (id: number, inputs: Partial<CategoryPropertyInputsType>) => {
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

export const deleteCategory = async (id: number) => {
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

export const deleteManyCategory = async (ids: Array<number>) => {
    await db
        .delete(categoryProperties)
        .where(inArray(categoryProperties.id, ids))


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
    const result = await db.transaction(async (tx) => {
        const [{ maxOrderPosition }] = await tx
            .select({
                maxOrderPosition: sql<number>`COALESCE(MAX(${categoryProperties.orderPosition}), -1)`.mapWith(
                    Number,
                ),
            })
            .from(categoryProperties);
        return tx.insert(categoryProperties).values({
            ...inputs,
            orderPosition: maxOrderPosition + 1,
        });
    });
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


export const toggleVisibilityCategory = async (ids: number[], isVisible: boolean) => {


    const query = db
        .update(categoryProperties)
        .set({
            isVisible,
        })
        .where(inArray(categoryProperties.id, ids))

    await query
  
    for (const id of ids) {
        const category = await isCategoryExist(String(id));
        if (!category) throw new Error(`this category is not found in database`);
        const message = `Modification de la visibilité de la catégorie ${category.name}`;
        sendToUserActions({
            message,
            action: "update",
            entity: ENTITIES_ENUM.CATEGORY_PROPERTIES,
            actionName: ACTION_NAMES.categoryProperties.create,
        });
    }
 

  
};


export const updateOrderPositionCategory = async (id: number, oldPosition: number, newPosition: number) => {

    const categoryExist = await isCategoryExist(String(id));
    if (!categoryExist) throw new Error(`this category is not found in database`);

    if (oldPosition !== newPosition) {
        await db.transaction(async (tx) => {
            if (newPosition > oldPosition) {
                // Déplacement vers le bas : on décale d'un cran vers le haut
                // les catégories situées entre l'ancienne et la nouvelle position
                await tx
                    .update(categoryProperties)
                    .set({ orderPosition: sql`${categoryProperties.orderPosition} - 1` })
                    .where(
                        and(
                            gt(categoryProperties.orderPosition, oldPosition),
                            lte(categoryProperties.orderPosition, newPosition),
                        ),
                    );
            } else {
                // Déplacement vers le haut : on décale d'un cran vers le bas
                // les catégories situées entre la nouvelle et l'ancienne position
                await tx
                    .update(categoryProperties)
                    .set({ orderPosition: sql`${categoryProperties.orderPosition} + 1` })
                    .where(
                        and(
                            gte(categoryProperties.orderPosition, newPosition),
                            lt(categoryProperties.orderPosition, oldPosition),
                        ),
                    );
            }

            await tx
                .update(categoryProperties)
                .set({ orderPosition: newPosition })
                .where(eq(categoryProperties.id, id));
        });
    }

    const message = `Modification de la position d'une catégorie`;
    const extras = { id,name: categoryExist.name, oldPosition,newPosition };
    await sendToUserActions({
        message,
        action: "update",
        entity: ENTITIES_ENUM.CATEGORY_PROPERTIES,
        actionName: ACTION_NAMES.categoryProperties.create,
        extras,
    });
    
 
};
