"use server";

import { auth } from "@/auth";
import { changePassword } from "@/database/drizzle/repositories/users";

export const updateEmployeeData = async (formData: FormData) => {
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
