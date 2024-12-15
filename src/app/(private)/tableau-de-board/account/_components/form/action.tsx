"use server";

import { auth, unstable_update } from "@/auth";
import { updateEmployee } from "@/database/drizzle/repositories/employee";
import { changePassword, updateUser } from "@/database/drizzle/repositories/users";

export const updateEmployeeData = async (formData: FormData) => {
    const session = await auth();
    const id = Number(session?.user?.id);
    const employeeData = {
        iban: formData.get("iban"),
        lastName: formData.get("lastName"),
        firstName: formData.get("firstName"),
        phone: formData.get("phone"),
    };
    await updateEmployee(id, employeeData);
    await unstable_update({
        ...session,
        user: { ...session?.user, name: `${employeeData.firstName} ${employeeData.lastName}` },
    });
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
