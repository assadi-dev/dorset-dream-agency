import { ENV } from "@/config/global";
import { drizzle } from "drizzle-orm/mysql2";

import { drizzle as drizzleSqlLite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { connection } from "./clients";

/**
 * Instance de connexion à la bdd MySql
 */
export const db = drizzle(connection);

const sqlite = new Database(ENV.SQLITE_DATABASE_URL);

/**
 * Instance de connexion à la bdd Sqlite
 */
export const sqlLite = drizzleSqlLite(sqlite);
