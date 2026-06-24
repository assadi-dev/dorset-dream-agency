import { ZodError } from "zod";

export const zodParserError = (error: ZodError) => {
    const errorMap = error.issues.map((err) => {
        return {
            message: err.message,
            path: err.path.join("").trim(),
        };
    });
    return errorMap;
};
