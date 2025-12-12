import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import { categoryProperties } from "./schema/categoryProperties";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { secteurs } from "./schema/secteurs";
import { MysqlDatabase } from "@/types/database";
import { SEEDS_FUNCTIONS } from "@/lib/seeds";
import { ENV_TEST } from "~/vitest.setup";
dotenv.config();

const main = async () => {
    const client = createPool({
        host: ENV_TEST.MYSQL_DB_HOST_TEST,
        user: ENV_TEST.MYSQL_DB_USER_TEST,
        password: ENV_TEST.MYSQL_DB_PASSWORD_TEST,
        database: ENV_TEST.MYSQL_DB_NAME_TEST,
        port: ENV_TEST.MYSQL_DB_PORT_TEST,
    });

    const db = drizzle(client);

    console.log(terminal.info("Seed TEST Start"));

    const handlers = SEEDS_FUNCTIONS(db);
    for (const seed of handlers) {
        console.log(`${seed.message.start}`);
        await seed.handler();
        console.log(`${seed.message.end}`);
    }

    console.log(terminal.success("Seed TEST Done !"));
};

const terminal = {
    info: chalk.bgBlue.bold,
    success: chalk.bgGreen.bold,
    error: chalk.bgRed.bold,
};

main();
