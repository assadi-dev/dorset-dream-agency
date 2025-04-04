"use server";

import { authenticate } from "@/database/drizzle/repositories/users";
import { LoginFormType } from "./schema";

export const getUserData = async (values: Partial<LoginFormType> | unknown) => {
    try {
        const user = await authenticate(values);
        return {
            ...user,
            id: String(user.id),
            role: user.role || "user",
        };
    } catch (error: any) {
        throw error;
    }
};
