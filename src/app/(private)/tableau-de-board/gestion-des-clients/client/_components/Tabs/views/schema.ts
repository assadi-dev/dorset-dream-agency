import { z } from "zod";

export const warrantFile = z.object({
    id: z.number().or(z.string()).optional().nullable(),
    name: z.string().optional().nullable(),
    file: z.instanceof(File),
});
export const warrantSchema = z.object({
    id: z.number().or(z.string()).optional().nullable(),
    clientID: z.number().or(z.string()).optional(),
    employeeID: z.number().or(z.string()).optional(),
    warrantFiles: z.array(warrantFile).min(1, "Vous devez ajouté au moins 1 fichier"),
});

export type WarrantFormType = z.infer<typeof warrantSchema>;

export type WarrantFileType = z.infer<typeof warrantFile>;
