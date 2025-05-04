"use server";

import { authenticate } from "@/database/drizzle/repositories/users";
import { LoginFormType } from "./schema";
import { signIn, signOut } from "@/auth";

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

export const handleSignInAction = async (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        //if (res?.error) throw new Error(res.);
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
};

export const handleLogoutAction = async () => {
    await signOut();
};
