"use server";

import { SALT_ROUNDS } from "@/config/security";

import bcrypt from "bcrypt";
import { db } from "@/database";
import { users } from "@/database/drizzle/schema/users";
import {
    passwordValidator,
    passwordValidatorType,
    UserCreateInputDto,
    userCredentialType,
    userCredentialValidator,
    UserUpdateInputDto,
    userUpdateValidator,
    userValidator,
} from "./dto/usersDTO";
import { eq, sql } from "drizzle-orm";
import { employees } from "../schema/employees";

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
    } catch (error: any) {
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
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const deleteAccounts = async (ids: Array<number>) => {
    try {
        for (const id of ids) {
            const request = db.delete(users).where(eq(users.id, sql.placeholder("id")));
            await request.execute({
                id,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const changePassword = async (id: number, values: passwordValidatorType) => {
    try {
        const findUserReq = db
            .select()
            .from(users)
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        const user = await findUserReq.execute({ id });

        if (!user) throw new Error("User not found !");
        const passwordValidate = passwordValidator(values);
        if (passwordValidate.error) {
            throw new Error(passwordValidate.error.message);
        }
        const newPassword = passwordValidate.data.password;
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        const result = db
            .update(users)
            .set({
                ...findUserReq,
                password: hashedPassword,
            })
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        await result.execute({ id });
    } catch (error: any) {
        throw error;
    }
};

export const updateUser = async (id: number, values: UserUpdateInputDto) => {
    try {
        const findUserReq = db
            .select()
            .from(users)
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        const user = await findUserReq.execute({ id });

        if (!user) throw new Error("User not found !");
        const userInputValidate = userUpdateValidator(values);
        if (userInputValidate.error) {
            throw new Error(userInputValidate.error.message);
        }
        const validateData = userInputValidate.data;

        const result = db
            .update(users)
            .set({
                ...user,
                ...validateData,
            })
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        await result.execute({ id });
    } catch (error: any) {
        throw error;
    }
};

type UserSession = {
    id: number;
    email: string;
    name: string;
    role: string;
    image: string;
    employeeID: number;
    grade: string;
};
export const authenticate = async (values: Partial<userCredentialType> | unknown): Promise<UserSession> => {
    try {
        const userInputValidate = userCredentialValidator(values);
        if (userInputValidate.error) {
            throw new Error(userInputValidate.error.message);
        }

        const validateInput = userInputValidate.data;

        const findUserReq = db
            .select({
                userID: users.id,
                username: users.username,
                password: users.password,
                role: users.role,
                employeeID: employees.id,
                name: sql<string>`CONCAT(${employees.lastName}," ",${employees.firstName})`,
                grade: employees.post,
            })
            .from(users)
            .leftJoin(employees, eq(users.id, employees.userID))
            .where(eq(users.username, sql.placeholder("username")))
            .prepare();
        const user = (await findUserReq.execute({ username: validateInput.username }))[0];
        if (!user) throw new Error("Unauthorized !", { cause: "authentication" });

        const match = await bcrypt.compare(validateInput.password, user.password);

        if (!match) throw new Error("Invalid credential !", { cause: "authentication" });

        return {
            id: user.userID,
            email: user.username,
            image: "",
            role: user.role,
            employeeID: user.employeeID,
            name: user.name,
            grade: user.grade,
        };
    } catch (error: any) {
        throw error;
    }
};
