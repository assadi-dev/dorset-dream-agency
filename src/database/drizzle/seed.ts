import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import chalk from "chalk";
import { SEEDS_FUNCTIONS } from "@/lib/seeds";
import { ENV } from "@/config/global";
dotenv.config();

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
