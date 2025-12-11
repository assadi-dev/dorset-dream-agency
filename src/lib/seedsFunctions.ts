"use server";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { MysqlDatabase } from "@/types/database";
import { secteurs } from "@/database/drizzle/schema/secteurs";
import { categoryProperties } from "@/database/drizzle/schema/categoryProperties";
import { DEFAULT_GRADES, defaultRoles } from "./rbac/constants";
import { roles } from "@/database/drizzle/schema/roles";
import { generatePermissions } from "./rbac/permissionsMocks";
import { permissions } from "@/database/drizzle/schema/permissions";
import { EMPLOYEE_POST } from "@/database/drizzle/utils";
import { grades } from "@/database/drizzle/schema/grades";

//Tableau des categories
const categories = ["Prestige", "Appartement", "Bureau", "Entrepot", "Garage", "Sous sol"];
const secteursNames = ["Iles Galapagos", "San Andreas"];
const bar = new cliProgress.SingleBar({ format: "{bar} {value}/{total}" });

export const seedCategoryProperty = async (db: MysqlDatabase) => {
    bar.start(categories.length, 0);
    for (const cat of categories) {
        await db.insert(categoryProperties).values({
            name: cat,
        });

        bar.increment();
    }
    bar.stop();
};

export const seedSecteurs = async (db: MysqlDatabase) => {
    bar.start(secteursNames.length, 0);
    for (const sect of secteursNames) {
        await db.insert(secteurs).values({
            name: sect,
        });
        bar.increment();
    }
    bar.stop();
};

export const seedRoles = async (db: MysqlDatabase) => {
    bar.start(defaultRoles.length, 0);
    let level = defaultRoles.length;
    for (const role of defaultRoles) {
        await db.insert(roles).values({
            name: role.name,
            displayName: role.displayName,
            description: role.description,
            level: (level -= 1),
        });
        bar.increment();
    }
    bar.stop();
};

export const seedPermissions = async (db: MysqlDatabase) => {
    const permissionsList = generatePermissions();
    bar.start(permissionsList.length, 0);
    for (const permission of permissionsList) {
        await db.insert(permissions).values({
            name: permission.name,
            ressource: permission.resource,
            action: permission.action,
            displayName: permission.displayName,
            description: permission.description,
        });
        bar.increment();
    }
    bar.stop();
};
export const seedRolePermissions = async (db: MysqlDatabase) => {
    //TODO à implementer le seed rolePermissions
};

export const seedGrades = async (db: MysqlDatabase) => {
    //TODO à implementer le seed grades
    const size = DEFAULT_GRADES.length;
    bar.start(size, 0);
    for (const grade of DEFAULT_GRADES) {
        await db.insert(grades).values({
            name: grade.name,
            description: grade.description,
        });
        bar.increment();
    }
    bar.stop();
};
