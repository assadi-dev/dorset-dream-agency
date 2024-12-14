"use server";

import { auth, unstable_update } from "@/auth";
import { changePassword, updateUser } from "@/database/drizzle/repositories/users";

export const updateEmployeeData = async (formData: FormData) => {
    const session = await auth();
    const id = Number(session?.user?.id);
    const employeeData = {
        lastName: formData.get("lastName"),
        firstName: formData.get("firstName"),
        phone: formData.get("phone"),
    };
};

export const updateEmployeePassword = async (formData: FormData) => {
    const session = await auth();
    const id = Number(session?.user?.id);
    const values = {
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };
    return changePassword(id, values);
};

export const updateUsernameEmployee = async (formData: FormData) => {
    const session = await auth();
    const id = Number(session?.user?.id);
    if (formData.get("username")) {
        const email = formData.get("username") as string;
        await updateUser(id, { username: email });
        unstable_update({
            ...session,
            user: { ...session?.user, email },
        });
    }
};
