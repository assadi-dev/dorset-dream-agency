import z from "zod";

export const schemaVersion = z.object({
    version: z
        .string()
        .regex(/^\d+\.\d+\.\d+$/, { message: "invalid format version input,the format must be xx.xx.xx " }),
});

export const validateVersionSchema = {
    versionInput: (input: unknown) => schemaVersion.safeParse(input),
};
