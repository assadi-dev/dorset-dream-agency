import { ENV } from "@/config/global";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = mysql.createPool({
    host: ENV.MYSQL_DB_HOST,
    user: ENV.MYSQL_DB_USER,
    database: ENV.MYSQL_DB_NAME,
    password: ENV.MYSQL_DB_PASSWORD,
    port: ENV.MYSQL_DB_PORT,
});
export const db = drizzle(connection);
