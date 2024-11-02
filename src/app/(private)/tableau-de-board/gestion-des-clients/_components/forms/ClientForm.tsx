"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema, ClientFormType } from "./schema";
import { DialogFooter } from "@/components/ui/dialog";
import useModalState from "@/hooks/useModalState";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import SubmitButton from "@/components/forms/SubmitButton";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import { GENRE_OPTIONS } from "@/config/enums";

type ClientFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultValues?: ClientFormType;
    save: (value: ClientFormType) => Promise<any>;
};
const ClientForm = ({ defaultValues, save, ...props }: ClientFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const modalState = useModalState();

    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            phone: "",
            gender: "Male",
            ...defaultValues,
        },
    });

    const traitement = async (values: ClientFormType) => {
        try {
            await save(values);
            ToastSuccessSonner("Le client à bien été créer avec success");
            modalState.closeModal();
        } catch (error: any) {
            const message = `Raison: ${error.message}`;
            ToastErrorSonner(message);
        }
    };

    const submitData: SubmitHandler<ClientFormType> = async (values) => {
        startTransition(async () => {
            await traitement(values);
        });
    };

    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(submitData)}>
                <div className="mb-4">
                    <FormFieldInput control={form.control} name="lastName" label="Nom" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} name="firstName" label="Prénom" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} name="phone" label="N° Téléphone" />
                </div>
                <div className="mb-4">
                    <FormFieldSelect control={form.control} label="Genre" name="gender" options={GENRE_OPTIONS} />
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

export default ClientForm;
