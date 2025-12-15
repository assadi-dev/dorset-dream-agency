import { MysqlDatabase } from "@/types/database";
import {
    seedCategoryProperty,
    seedEmployeeAccounts,
    seedGrades,
    seedPermissions,
    seedRolePermissions,
    seedRoles,
    seedSecteurs,
} from "./seedsFunctions";

type SeedEntity = {
    entity: string;
    message: {
        start: string;
        end: string;
    };
    error?: string;
    handler: () => Promise<void>;
};
export const SEEDS_FUNCTIONS = (db: MysqlDatabase): SeedEntity[] => {
    return [
        /*     {
            entity: "users + employees",
            message: {
                start: "Employees accounts creations",
                end: "Employees account done!",
            },
            handler: () => seedEmployeeAccounts(db),
        },

        {
            entity: "categoryProperties",
            message: {
                start: "Categories properties creations",
                end: "Categories properties done!",
            },
            handler: () => seedCategoryProperty(db),
        },
        {
            entity: "secteurs",
            message: {
                start: "Secteurs creations",
                end: "Secteurs done!",
            },
            handler: () => seedSecteurs(db),
        },
        {
            entity: "roles",
            message: {
                start: "Roles  creations",
                end: "Roles done!",
            },
            handler: () => seedRoles(db),
        }, */

        {
            entity: "permissions",
            message: {
                start: "Permissions  creation",
                end: "Permission done!",
            },
            handler: () => seedPermissions(db),
        },
        /*         {
            entity: "rolePermissions",
            message: {
                start: "RolePermissions  creation",
                end: "RolePermissions done!",
            },
            handler: () => seedRolePermissions(db),
        },
        {
            entity: "grades",
            message: {
                start: "Grades  creation",
                end: "Grades done!",
            },
            handler: () => seedGrades(db),
        }, */
    ];
};
