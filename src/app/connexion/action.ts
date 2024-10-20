"use server";

import { authenticate } from "@/database/drizzle/repositories/users";
import { LoginFormType } from "./schema";

export const getUserData = async (values: LoginFormType) => {
    try {
        const user = await authenticate(values);
        return {
            ...user,
            id: String(user.id),
        };
    } catch (error) {
        return null;
    }
};
