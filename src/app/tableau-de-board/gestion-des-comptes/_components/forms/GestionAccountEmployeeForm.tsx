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
import FormFieldCustom from "@/components/forms/FormFieldCustom";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/inputPassword";
import FormFieldInput from "@/components/forms/FormFieldInput";

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
                    <FormFieldInputPass control={form.control} name="password" label="Mot de passe" />

                    <FormFieldInput control={form.control} name="confirmPassword" label="Confirmation" />
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} name="role" label="Role">
                        <Input {...form.register("role")} />
                    </FormFieldCustom>
                </div>

                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldCustom control={form.control} name="lastName" label="Nom">
                        <Input {...form.register("lastName")} />
                    </FormFieldCustom>
                    <FormFieldCustom control={form.control} name="firstName" label="Prénom">
                        <Input {...form.register("firstName")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldCustom control={form.control} name="post" label="Grade">
                        <Input {...form.register("post")} />
                    </FormFieldCustom>
                    <FormFieldCustom control={form.control} name="gender" label="Genre">
                        <Input {...form.register("gender")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4 grid lg:grid-cols-2 gap-3">
                    <FormFieldCustom control={form.control} name="phone" label="N° Téléphone">
                        <Input {...form.register("phone")} />
                    </FormFieldCustom>
                    <FormFieldCustom control={form.control} name="iban" label="IBAN">
                        <Input {...form.register("iban")} />
                    </FormFieldCustom>
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
