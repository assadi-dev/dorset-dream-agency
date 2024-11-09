import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import { categoryProperties } from "./schema/categoryProperties";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { secteurs } from "./schema/secteurs";
dotenv.config();

const ENV = {
    MYSQL_DB_USER: process.env.MYSQL_DB_USER,
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
    MYSQL_DB_PORT: Number(process.env.MYSQL_DB_PORT),
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
};

//Tableau des categories
const categories = ["Prestige", "Appartement", "Bureau", "Entrepot", "Garage", "Sous sol"];
const secteursNames = ["Iles Galapagos", "San Andreas"];
const secteurs = ["Iles Galapagos", "San Andreas"];
const bar = new cliProgress.SingleBar({ format: "{bar} {value}/{total}" });

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
    console.log("Categories properties creations");
    bar.start(categories.length, 0);
    for (const cat of categories) {
        await db.insert(categoryProperties).values({
            name: cat,
        });

        bar.increment();
    }
    bar.stop();
    console.log(chalk.green(" Categories properties done! "));

    console.log("Secteurs creations");
    bar.start(secteursNames.length, 0);
    for (const sect of secteursNames) {
        await db.insert(secteurs).values({
            name: sect,
        });
        bar.increment();
    }
    bar.stop();
    console.log(chalk.green(` Secteurs done! `));

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
