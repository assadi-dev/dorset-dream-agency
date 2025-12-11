import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import { categoryProperties } from "./schema/categoryProperties";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { secteurs } from "./schema/secteurs";
import { MysqlDatabase } from "@/types/database";
import { SEEDS_FUNCTIONS } from "@/lib/seeds";
dotenv.config();

const ENV = {
    MYSQL_DB_USER: process.env.MYSQL_DB_USER,
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
    MYSQL_DB_PORT: Number(process.env.MYSQL_DB_PORT),
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
};

const main = async () => {
    const client = createPool({
        host: ENV.MYSQL_DB_HOST,
        user: ENV.MYSQL_DB_USER,
        password: ENV.MYSQL_DB_PASSWORD,
        database: ENV.MYSQL_DB_NAME,
        port: ENV.MYSQL_DB_PORT,
    });

    const db = drizzle(client);

    console.log(terminal.info(" Seed start "));

    const handlers = SEEDS_FUNCTIONS(db);
    for (const seed of handlers) {
        console.log(`${seed.message.start}`);
        await seed.handler();
        console.log(`${seed.message.end}`);
    }

    console.log(terminal.success(" Seed done "));
};

const terminal = {
    info: chalk.bgBlue.bold,
    success: chalk.bgGreen.bold,
    error: chalk.bgRed.bold,
};

main();

//INSERT INTO `users` (`id`, `username`, `password`, `avatar`, `role`, `created_at`, `updated_at`) VALUES (NULL, 'admin@dorsetdreamagency.com', '$2b$10$c.YmxSMgZTumDHmb.rIWGO5DBylL9Tz/jkw13Ik28dWVa02Es5s2q', NULL, 'admin', NULL, NULL);
//INSERT INTO `employees` (`id`, `last_name`, `first_name`, `post`, `iban`, `phone`, `gender`, `user_id`, `created_at`, `updated_at`) VALUES (NULL, 'Jack', 'Celer', 'Patron', '123456', '555-1234', 'Male', '2', CURRENT_DATE(), CURRENT_DATE());
