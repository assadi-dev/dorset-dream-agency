"use client"
import FormFieldInput from "@/components/forms/FormFieldInput";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaxeInputsType, taxesSchema } from "@/database/drizzle/repositories/dto/taxesDTO";
import { useTransition } from "react";

type Props = {
    defaultValues?: TaxeInputsType;
    onSubmit: (data: TaxeInputsType) => Promise<void>;
}
const TaxesForm = ({ defaultValues, onSubmit }: Props) => {

    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(taxesSchema),
        defaultValues: {
            name: "",
            rate: 0,
            ...defaultValues,
        },
    });

    const submit: SubmitHandler<TaxeInputsType> = async (data) => {
        try {
            startTransition(async () => {
                try {
                    await onSubmit(data);
                } catch (error) {
                    throw error;
                }
            })
        } catch (error) {
            throw error;
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4 justify-between w-full">
                <div className="w-full flex flex-col gap-4">
                    <FormFieldInput
                        control={form.control}
                        name="name"
                        label="Nom"
                        placeholder="Nom"
                    />
                    <FormFieldInput
                        control={form.control}
                        name="rate"
                        label="Taux"
                        placeholder="Taux"
                    />

                    <FormFieldInput
                        control={form.control}
                        name="description"
                        label="Description (optionnel)"
                        placeholder="Description"
                        description="Description de la taxe 100 caracteres maximum"
                    />
                </div>
                <div className="py-3 w-full">
                    <SubmitButton className="w-full" isLoading={form.formState.isSubmitting} type="submit">Enregistrer</SubmitButton>
                </div>
            </form>
        </Form>
    );
}

export default TaxesForm;