import SubmitButton from "@/components/forms/SubmitButton";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import useModalState from "@/hooks/useModalState";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { gestionAccountEmployeeSchema, GestionEmployeeFormType } from "./schema";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import { GENRE_OPTIONS, GRADE_OPTIONS, ROLE_OPTIONS } from "@/config/enums";

type GestionAccountFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (values: GestionEmployeeFormType) => Promise<any>;
};
const GestionAccountEmployeeForm = ({ save, ...props }: GestionAccountFormProps) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<GestionEmployeeFormType>({
        resolver: zodResolver(gestionAccountEmployeeSchema),
        defaultValues: {
            gender: "Male",
            post: "Employée",
            role: "user",
        },
    });

    const processing = async (values: GestionEmployeeFormType) => {
        try {
            await save(values);
            form.reset();
            ToastSuccessSonner("Le compte ainsi que ses renseignement ont bien été enregistré");
            modalState.closeModal();
        } catch (error: any) {
            const message = `Raison: ${error.message}`;
            ToastErrorSonner(message);
        }
    };

    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;
    const submitData: SubmitHandler<GestionEmployeeFormType> = async (values) => {
        startTransition(async () => processing(values));
    };

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(submitData)}>
                <div className="mb-4">
                    <FormFieldInput
                        control={form.control}
                        name="username"
                        label="Identifiant de connexion"
                        autoComplete="username"
                    />
                </div>
                <div className="mb-4 lg:flex gap-3">
                    <FormFieldInputPassword
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        description="minimum 6 caractères"
                        autoComplete="new-password"
                        classNameFormItem="w-full"
                    />

                    <FormFieldInputPassword
                        control={form.control}
                        name="confirmPassword"
                        label="Confirmation"
                        autoComplete="new-password"
                        classNameFormItem="w-full"
                    />
                </div>
                <div className="mb-4">
                    <FormFieldSelect control={form.control} name="role" label="Role" options={ROLE_OPTIONS} />
                </div>

                <div className="mb-4 lg:flex gap-3">
                    <FormFieldInput control={form.control} name="lastName" label="Nom" classNameFormItem="w-full" />
                    <FormFieldInput control={form.control} name="firstName" label="Prénom" classNameFormItem="w-full" />
                </div>
                <div className="mb-4 lg:flex gap-3">
                    <FormFieldSelect
                        control={form.control}
                        name="post"
                        label="Grade"
                        options={GRADE_OPTIONS}
                        classNameFormItem="w-full"
                    />
                    <FormFieldSelect
                        control={form.control}
                        label="Genre"
                        name="gender"
                        options={GENRE_OPTIONS}
                        classNameFormItem="w-full"
                    />
                </div>
                <div className="mb-4 lg:flex gap-3">
                    <FormFieldInput
                        control={form.control}
                        name="phone"
                        label="N° Téléphone"
                        classNameFormItem="w-full"
                    />

                    <FormFieldInput control={form.control} name="iban" label="IBAN" classNameFormItem="w-full" />
                </div>

                <DialogFooter className="pt-3">
                    <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                        {SUBMIT_LABEL}
                    </SubmitButton>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default GestionAccountEmployeeForm;
