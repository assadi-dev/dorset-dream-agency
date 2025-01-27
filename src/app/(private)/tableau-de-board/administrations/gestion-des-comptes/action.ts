"use server";

import { SALT_ROUNDS } from "@/config/security";
import {
    EmployeeCreateInputDto,
    employeeValidator,
    GestionEmployeeFormType,
    PasswordFormTypeWithoutUsername,
    passwordValidator,
    UserCreateInputDto,
} from "./_components/forms/schema";

import { changePassword, deleteAccounts, insertUserAccount, updateUser } from "@/database/drizzle/repositories/users";
import { UserUpdateInputDto } from "@/database/drizzle/repositories/dto/usersDTO";
import { insertEmployee } from "@/database/drizzle/repositories/employee";

/**
 * Insertion d'un compte utilisateur vers la base de donné
 * @param values
 *
 */
export const createAccount = async (
    values: GestionEmployeeFormType & {
        userID?: any;
    },
) => {
    const newUser = await insertUserAccount(values);
    values.userID = newUser?.id;
    const secteursIds = values.secteur.map((secteur) => Number(secteur.value));
    await insertEmployee({ ...values, secteursIds });
};

export const removeUsersAccounts = (usersIds: Array<number>) => {
    return deleteAccounts(usersIds);
};

export const editUserData = async (id: number, values: UserUpdateInputDto) => {
    try {
        await updateUser(id, values);
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
export const updateUserPassword = async (id: number, values: PasswordFormTypeWithoutUsername) => {
    try {
        await changePassword(id, values);
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
