"use server";
import { db } from "@/database";
import { grades } from "../schema/grades";
import { CreateGradeInputs, gradeValidations, UpdateGradeInputs } from "./dto/gradeDTO";
import { eq, sql } from "drizzle-orm";
import { generateDescription } from "./utils/entity";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";

export const createGrade = async (inputs: CreateGradeInputs) => {
    try {
        const result = await db.insert(grades).values(inputs);

        const grade = await findGradeByID(result[0].insertId);
        if (grade) {
            const descriptionMessage = `Création du grade ${grade.name}`;
            const description = await generateDescription(descriptionMessage);
            if (description) {
                insertUserAction({
                    user: description.user as string,
                    action: "create",
                    name: ACTION_NAMES.grades.create,
                    description: JSON.stringify(description),
                    grade: description.grade as string,
                    entity: ENTITIES_ENUM.GRADES,
                });
            }
        }
    } catch (error: any) {
        throw error;
    }
};

export const findGradeByID = async (id: number) => {
    try {
        const query = db
            .select()
            .from(grades)
            .where(eq(grades.id, sql.placeholder("id")))
            .prepare();
        const result = await query.execute({ id });
        if (!result[0]) return null;
        return result[0];
    } catch (error: any) {
        throw error;
    }
};

export const updateGrade = async (id: number, values: UpdateGradeInputs) => {
    try {
        const grade = await findGradeByID(id);
        if (!grade) throw Error("Grade no found");
        const validateInput = gradeValidations(values);
        if (validateInput.error) throw validateInput.error;
        const request = db
            .update(grades)
            .set(validateInput.data)
            .where(eq(grades.id, sql.placeholder("id")))
            .prepare();
        request.execute({
            id,
        });
        await request.execute({ id });

        const descriptionMessage = `Modification du grade ${grade.name}`;
        const description = await generateDescription(descriptionMessage);
        if (description) {
            insertUserAction({
                user: description.user as string,
                action: "update",
                name: ACTION_NAMES.grades.update,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.GRADES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const deleteGrade = async (id: number) => {
    try {
        const grade = await findGradeByID(id);
        if (!grade) throw Error("Grade no found");
        const request = db
            .delete(grades)
            .where(eq(grades.id, sql.placeholder("id")))
            .prepare();
        await request.execute({
            id,
        });

        const descriptionMessage = `Suppression du grade ${grade.name}`;
        const description = await generateDescription(descriptionMessage);
        if (description) {
            insertUserAction({
                user: description.user as string,
                action: "delete",
                name: ACTION_NAMES.grades.delete,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.GRADES,
            });
        }
    } catch (error: any) {
        throw error;
    }
};

export const deleteMultipleGrade = async (ids: number[]) => {
    try {
        for (const id of ids) {
            try {
                await deleteGrade(id);
            } catch (error) {
                continue;
            }
        }
    } catch (error) {
        throw error;
    }
};
