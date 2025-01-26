import { ENV } from "@/config/global";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { drizzle as drizzleSqlLite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const connection = mysql.createPool({
    host: ENV.MYSQL_DB_HOST,
    user: ENV.MYSQL_DB_USER,
    database: ENV.MYSQL_DB_NAME,
    password: ENV.MYSQL_DB_PASSWORD,
    port: ENV.MYSQL_DB_PORT,
});

/**
 * Instance de connexion à la bdd MySql
 */
export const db = drizzle(connection);

const sqlite = new Database(ENV.SQLITE_DATABASE_URL);

/**
 * Instance de connexion à la bdd Sqlite
 */
export const sqlLite = drizzleSqlLite(sqlite);
