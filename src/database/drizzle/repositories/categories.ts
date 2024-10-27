import { db } from "@/database";
import { categoryProperties } from "../schema/categoryProperties";
import { desc, eq, sql } from "drizzle-orm";

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
