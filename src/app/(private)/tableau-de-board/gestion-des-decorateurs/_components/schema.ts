import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";
import z from "zod";

export const DecoratorSchema = z.object({
    firstName: z.string().min(1, REQUIRE_MESSAGE_ERROR),
    lastName: z.string().min(1, REQUIRE_MESSAGE_ERROR),
    email: z.string().nullable().optional(),
    phone: z.string().min(1, REQUIRE_MESSAGE_ERROR),
    speciality: z.string().nullable().optional(),
    experience: z.string().nullable().optional(),
    averageTime: z.string().nullable().optional(),
    photoID: z.number().nullable().optional(),
 
});




export const DecoratorProfileFormSchema = DecoratorSchema.extend({
    photo: z.instanceof(File).optional(),
});

export type DecoratorFormType = z.infer<typeof DecoratorProfileFormSchema>;
export type DecoratorProfileType = z.infer<typeof DecoratorSchema>;

export  const decoratorProfileSchemaDecoder = {
 createDecoratorProfile:(inputs:unknown) => DecoratorSchema.safeParse(inputs),
 updateDecoratorProfile:(inputs:unknown) => DecoratorSchema.partial().safeParse(inputs),
 deleteDecoratorProfile:(ids:unknown) => z.array(z.number()).safeParse(ids),
}