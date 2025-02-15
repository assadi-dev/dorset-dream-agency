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
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";
import { employees } from "../schema/employees";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { generateDescription, selectWithSoftDelete, setDeletedAt, withPagination } from "./utils/entity";
import { photos } from "../schema/photos";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";
import { deleteEmployee } from "./employee";
import { FORBIDDEN_ACTION } from "@/config/messages";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/utils";

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(users);

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
        const newUser = await findUserById(userId);
        const description = await generateDescription(`Création  du compte pour ${newUser.username}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "create",
                name: ACTION_NAMES.users.create,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.USERS,
            });
        }
        return newUser;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const findUserById = async (id: number) => {
    const softDeleteCondition = selectWithSoftDelete(users);
    const findUserReq = db
        .select({
            id: users.id,
            username: users.username,
            role: users.role,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
            employeeID: employees.id,
        })
        .from(users)
        .leftJoin(employees, eq(employees.userID, users.id))
        .where(and(softDeleteCondition, eq(users.id, sql.placeholder("id"))))
        .prepare();
    const user = await findUserReq.execute({ id });
    return user[0];
};

export const findUserByUsername = async (username: string) => {
    const findUserReq = db
        .select()
        .from(users)
        .where(and(softDeleteCondition, eq(users.id, sql.placeholder("username"))))
        .prepare();
    const user = await findUserReq.execute({ username });
    return user[0];
};

export const getAccountCollections = async (filter: FilterPaginationType) => {
    try {
        const { search, order, limit, page } = filter;
        const searchCondition = search
            ? or(like(users.username, sql.placeholder("search")), like(users.role, sql.placeholder("search")))
            : undefined;
        const query = db
            .select({
                id: users.id,
                username: users.username,
                role: users.role,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(and(softDeleteCondition, searchCondition))
            .$dynamic();

        const orderByColumn = order === "asc" ? asc(users.createdAt) : desc(users.createdAt);
        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        const rowsCount = await query.execute({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const data = await withPagination(query, orderByColumn, page, limit, parameters);
        return {
            page,
            totalItems,
            limit,
            data,
        };
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const deleteAccounts = async (ids: Array<number>) => {
    try {
        const session = await auth();
        for (const id of ids) {
            const user = await findUserById(id);
            if (!user) throw new Error("Cet utilisateur n'existe plus");
            /*   const request = db.delete(users).where(eq(users.id, sql.placeholder("id")));
            await request.execute({
                id,
            }); */
            if (isAdmin(user.role) && !isAdmin(session?.user?.role)) throw new Error(FORBIDDEN_ACTION);

            if (user.employeeID) {
                const requestEmployee = setDeletedAt(employees)
                    ?.where(eq(employees.id, sql.placeholder("id")))
                    .prepare();

                await requestEmployee?.execute({
                    id: user.employeeID,
                });
            }

            const request = setDeletedAt(users)
                ?.where(eq(users.id, sql.placeholder("id")))
                .prepare();

            await request?.execute({
                id,
            });

            const extras = {
                id: user.id,
                employeeID: user.employeeID,
            };
            const description = await generateDescription(`Suppression du compte de ${user.username}`, extras);
            if (description) {
                await insertUserAction({
                    user: description.user as string,
                    action: "delete",
                    name: ACTION_NAMES.users.delete,
                    description: JSON.stringify(description),
                    grade: description.grade as string,
                    entity: ENTITIES_ENUM.USERS,
                });
            }
        }
    } catch (error: any) {
        throw error;
    }
};

export const changePassword = async (id: number, values: passwordValidatorType) => {
    try {
        const user = await findUserById(id);

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
                ...user,
                password: hashedPassword,
            })
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        await result.execute({ id });
        const description = await generateDescription(`Changement de mot de passe de ${user.username}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "update",
                name: ACTION_NAMES.users.updatePassword,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.USERS,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const updateUser = async (id: number, values: UserUpdateInputDto) => {
    try {
        const user = await findUserById(id);

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
        const userUpdate = await result.execute({ id });
        const description = await generateDescription(`Modification du compte de ${user.username}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "update",
                name: ACTION_NAMES.users.update,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.USERS,
            });
        }
        return userUpdate;
    } catch (error: any) {
        throw error;
    }
};

export const restoreUser = async (id: number) => {
    try {
        const user = await findUserById(id);

        if (!user) throw new Error("User not found !");

        const result = db
            .update(users)
            .set({
                ...user,
                deletedAt: null,
            })
            .where(eq(users.id, sql.placeholder("id")))
            .prepare();
        await result.execute({ id });

        const description = await generateDescription(`Restauration du compte de ${user.username}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "restore",
                name: ACTION_NAMES.users.restore,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.USERS,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const restoreAccount = async (ids: number[]) => {
    if (ids.length > 0) {
        for (const id of ids) {
            await restoreUser(id);
        }
    }
};

type UserSession = {
    id: number;
    email: string;
    name: string;
    role: string;
    image: string;
    employeeID?: number | null;
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
                name: sql<string>`CONCAT(${employees.firstName}," ",${employees.lastName})`,
                grade: employees.post,
                photoUrl: photos.url,
            })
            .from(users)
            .leftJoin(employees, eq(users.id, employees.userID))
            .leftJoin(photos, eq(photos.id, employees.photoID))
            .where(and(softDeleteCondition, eq(users.username, sql.placeholder("username"))))
            .prepare();
        const user = (await findUserReq.execute({ username: validateInput.username }))[0];
        if (!user) throw new Error("User no found !", { cause: "authentication" });

        const match = await bcrypt.compare(validateInput.password, user.password);

        if (!match) throw new Error("Invalid credential !", { cause: "authentication" });

        return {
            id: user.userID,
            email: user.username,
            image: user.photoUrl || "",
            role: user.role,
            employeeID: user.employeeID || null,
            name: user.name,
            grade: String(user.grade),
        };
    } catch (error: any) {
        throw error;
    }
};

export const currentUser = async (idUser: number) => {
    const query = db
        .select({
            userId: users.id,
            username: users.username,
            employeeID: employees.id,
            iban: employees.iban,
            lastName: employees.lastName,
            firstName: employees.firstName,
            gender: employees.gender,
            grade: employees.post,
            phone: employees.phone,
            createdAt: users.createdAt,
        })
        .from(users)
        .where(and(softDeleteCondition, eq(users.id, sql.placeholder("id"))))
        .leftJoin(employees, eq(users.id, employees.userID))
        .prepare();
    const result = await query.execute({
        id: idUser,
    });
    return result[0];
};
