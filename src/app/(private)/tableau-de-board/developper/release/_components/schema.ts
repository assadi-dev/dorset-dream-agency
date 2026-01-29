import z from "zod";

const fieldSchema = z.object({
    id: z.string().default(Date.now().toString()),
    name: z.string().min(1),
    value: z.string().min(1),
});
export const releaseFormSchema = z.object({
    version: z.string(),
    fields: z.array(fieldSchema).length(1),
});

export type FieldSchemaInfer = z.infer<typeof fieldSchema>;
export type ReleaseFormInfer = z.infer<typeof releaseFormSchema>;
