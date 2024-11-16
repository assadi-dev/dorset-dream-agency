import { z } from "zod";

export const warrantsPerquisitionsPhotosSchema = z.object({
    warrantPerquisitionID: z.coerce.number(),
    photoID: z.coerce.number(),
});

export type WarrantsPerquisitionsPhotosInputs = z.infer<typeof warrantsPerquisitionsPhotosSchema>;
