import { REQUIRE_MESSAGE_ERROR } from "@/config/messages"
import z from "zod"

export const taxesSchema = z.object({
    name: z.string().min(1,{message:REQUIRE_MESSAGE_ERROR}),
    rate: z.coerce.number(),
    description: z.string().max(100).optional(),
})
export type TaxeInputsType = z.infer<typeof taxesSchema>;
const deleteManySchema = z.object({
    ids: z.array(z.number()).min(1,{message:REQUIRE_MESSAGE_ERROR}),
})
export const taxesValidator = {
    create:(inputs:unknown)=>taxesSchema.safeParse(inputs),
    update:(inputs:unknown)=>taxesSchema.partial().safeParse(inputs),
    deleteMany:(inputs:unknown)=>deleteManySchema.safeParse(inputs),
    
}