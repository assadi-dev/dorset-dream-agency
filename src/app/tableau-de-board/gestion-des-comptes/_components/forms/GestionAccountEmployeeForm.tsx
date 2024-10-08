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

type GestionAccountFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (values: GestionEmployeeFormType) => Promise<any>;
};
const GestionAccountEmployeeForm = ({ save, ...props }: GestionAccountFormProps) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<GestionEmployeeFormType>({
        resolver: zodResolver(gestionAccountEmployeeSchema),
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
                    <FormFieldInput control={form.control} name="username" label="Identifiant de connexion" />
                </div>
                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldInputPassword
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        description="minimum 6 caractères"
                    />

                    <FormFieldInputPassword control={form.control} name="confirmPassword" label="Confirmation" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} name="role" label="Role" />
                </div>

                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldInput control={form.control} name="lastName" label="Nom" />
                    <FormFieldInput control={form.control} name="firstName" label="Prénom" />
                </div>
                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldInput control={form.control} name="post" label="Grade" />

                    <FormFieldInput control={form.control} name="gender" label="Genre" />
                </div>
                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldInput control={form.control} name="phone" label="N° Téléphone" />

                    <FormFieldInput control={form.control} name="iban" label="IBAN" />
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
