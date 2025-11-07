import { createReadStream, createWriteStream, ReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

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
            //update package.js
            const parseContent = JSON.parse(readContent);
            parseContent.version = version;
            writePackageJsonFile(readStreamContent, JSON.stringify(parseContent));
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error is occur in updateVersionFile: ${error.message}`);
        }
    }
};

export const writePackageJsonFile = (readStreamContent: ReadStream, content: string) => {
    const readable = Readable.from(content);
    const writeStream = createWriteStream(packageJsonPath);
    readable.pipe(writeStream);
};
