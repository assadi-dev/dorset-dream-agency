import { createReadStream, createWriteStream, ReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

const resolvePath = path.resolve();
const packageJsonPath = path.join(resolvePath, "package.json");
const releasePath = path.join(resolvePath, "src", "app", "api", "(release)", "release", "generate", "release.json");
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
            writePackageJsonFile(JSON.stringify(parseContent));
            readStreamContent.close();
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error is occur in updateVersionFile: ${error.message}`);
        }
    }
};

export const updateReleaseFile = async ({ fields }: { fields: { name: string; value: string }[] }) => {
    try {
        const readStreamContent = createReadStream(releasePath);
        let readContent = "";
        readStreamContent.on("data", (data) => {
            readContent = data.toString();
        });
        readStreamContent.on("end", () => {
            writeReleaseJsonFile(JSON.stringify([...fields]));
            readStreamContent.close();
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error;
        }
    }
};

export const writePackageJsonFile = (content: string) => {
    const readable = Readable.from(content);
    const writeStream = createWriteStream(packageJsonPath);
    readable.pipe(writeStream);
};
export const writeReleaseJsonFile = (content: string) => {
    const readable = Readable.from(content);
    const writeStream = createWriteStream(releasePath);
    readable.pipe(writeStream);
};

type releaseField = { name: string; value: string | number };
export const readReleaseJsonContent = (): Promise<releaseField[]> => {
    const releaseContentPromise = new Promise<releaseField[] | []>((resolve) => {
        try {
            let readContent: string = "";
            const readStream = createReadStream(releasePath);
            readStream.on("data", (data) => {
                readContent = data.toString();
            });
            readStream.once("error", (error) => {
                console.error(error);
                resolve([]);
            });
            readStream.once("end", () => {
                const parseData = JSON.parse(readContent);
                resolve(parseData);
            });
        } catch (error) {
            resolve([]);
        }
    });
    return releaseContentPromise;
};
