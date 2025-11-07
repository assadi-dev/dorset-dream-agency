import { createReadStream, createWriteStream } from "fs";
import path from "path";

const resolvePath = path.resolve();
const packageJsonPath = path.join(resolvePath, "package.json");
export const updateVersionFile = async (version: string) => {
    try {
        const readStreamContent = createReadStream(packageJsonPath);
        let readContent = "";
        readStreamContent.on("data", (data) => {
            readContent = data.toString();
        });
        readStreamContent.on("end", () => {
            readStreamContent.close();
            //update package.js
            const parseContent = JSON.parse(readContent);
            parseContent.version = version;
            writePackageJsonFile(parseContent);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error is occur in updateVersionFile: ${error.message}`);
        }
    }
};

export const writePackageJsonFile = (content: any) => {
    const writeStream = createWriteStream(packageJsonPath);
};
