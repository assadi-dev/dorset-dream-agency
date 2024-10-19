import { db } from "@/database";
import { secteurs } from "../schema/secteurs";
import { sql } from "drizzle-orm";

export const getSecteursOptions = async () => {
    try {
        const request = db
            .select({
                id: secteurs.id,
                label: secteurs.name,
                value: secteurs.id,
            })
            .from(secteurs);
        return await request;
    } catch (error) {
        throw error;
    }
};
