import FormFieldInput from "@/components/forms/FormFieldInput";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form } from "@/components/ui/form";
import { categoriesSchema, CategoryInputsType } from "@/database/drizzle/repositories/dto/categoriesDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    defaultValues?: CategoryInputsType;
    onSubmit: (data: CategoryInputsType) => Promise<void>;
}
export const CategoryForm = ({ defaultValues, onSubmit }: Props) => {

    const form = useForm({
        resolver: zodResolver(categoriesSchema),
        defaultValues: {
            name: "",
            ...defaultValues,
        },
    });

    const submit: SubmitHandler<CategoryInputsType> = async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4 justify-between w-full">
                <div className="w-full min-h-10">
                    <FormFieldInput
                        control={form.control}
                        name="name"
                        label="Nom"
                        placeholder="Nom"
                    />
                </div>
                <div className="py-3 w-full">
                    <SubmitButton className="w-full" isLoading={form.formState.isSubmitting} type="submit">Enregistrer</SubmitButton>
                </div>
            </form>
        </Form>
    );
}