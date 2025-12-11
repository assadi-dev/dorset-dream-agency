import { MySql2Database } from "drizzle-orm/mysql2";

export type OmitInputCreation = "id" | "createdAt" | "updatedAt" | "deletedAt";

export type MysqlDatabase = MySql2Database<Record<string, never>>;
