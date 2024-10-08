"use server";

import { SALT_ROUNDS } from "@/config/security";
import {
    EmployeeCreateInputDto,
    employeeValidator,
    passwordValidator,
    UserCreateInputDto,
    userValidator,
} from "./_components/forms/schema";
import bcrypt from "bcrypt";
import { db } from "@/database";
import { users } from "@/database/drizzle/schema/users";
import { employees } from "@/database/drizzle/schema/employees";

/**
 * Insertion d'un compte utilisateur vers la base de donné
 * @param values
 *
 */
export const insertUserAccount = async (values: UserCreateInputDto) => {
    try {
        //Validation des champs utilisateur
        const userValidation = userValidator(values);

        if (userValidation.error) throw userValidation.error;

        //Vérification des mot de passes
        const password = values.password;
        const confirmPassword = values.confirmPassword;
        const passwordValidation = passwordValidator({ password, confirmPassword });
        if (passwordValidation.error) throw passwordValidation.error;

        /**
         * Mot de passe crypté
         */
        const hashedPassword = await bcrypt.hash(passwordValidation.data.password, SALT_ROUNDS);

        const request = await db
            .insert(users)
            .values({
                username: userValidation.data.username,
                password: hashedPassword,
                role: userValidation.data.role,
            })
            .$returningId();
        const userId = request[0].id;
        return userId;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

/**
 * Insertion des donné de l'employé
 */
export const insertEmployee = async (values: EmployeeCreateInputDto) => {
    try {
        const employeeValidation = employeeValidator(values);
        if (employeeValidation.error) throw employeeValidation.error;

        if (values.userID) employeeValidation.data.userID = values.userID;

        const request = await db.insert(employees).values(employeeValidation.data).$returningId();
        const employeeId = request[0].id;
        return employeeId;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getAccountCollections = async () => {
    try {
        const request = await db
            .select({
                id: users.id,
                username: users.username,
                role: users.role,
                createdAt: users.createdAt,
            })
            .from(users);

        return request;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
