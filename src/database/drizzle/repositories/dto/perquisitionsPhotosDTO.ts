import { z } from "zod";

export const perquisitionsPhotosSchema = z.object({
    perquisitionID: z.coerce.number(),
    photoID: z.coerce.number(),
});
export const perquisitionsCreate = z.object({
    employeeID: z.coerce.number().min(1),
    clientID: z.coerce.number().min(1),
});

export type PerquisitionsPhotosInputs = z.infer<typeof perquisitionsPhotosSchema>;

export const perquisitionDecode = {
    perquisitionInput: (values: unknown) => perquisitionsCreate.safeParse(values),
};
