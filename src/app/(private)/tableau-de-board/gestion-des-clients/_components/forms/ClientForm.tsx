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
import FormFieldSwitch from "@/components/forms/FormFieldSwitch";
import { useSession } from "next-auth/react";
import { UserSession } from "@/auth";
import { cn, isAdmin } from "@/lib/utils";

type ClientFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultValues?: ClientFormType;
    save: (value: ClientFormType) => Promise<any>;
};
const ClientForm = ({ defaultValues, save, ...props }: ClientFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const modalState = useModalState();

    const { data } = useSession();
    const session = data as UserSession;

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
            <form
                {...props}
                className={cn(props.className, "flex flex-col justify-between")}
                onSubmit={form.handleSubmit(submitData)}
            >
                <div>
                    <div className="mb-4 grid grid-cols-2 gap-3">
                        <FormFieldInput control={form.control} name="lastName" label="Nom" />
                        <FormFieldInput control={form.control} name="firstName" label="Prénom" />
                    </div>

                    <div className="mb-4">
                        <FormFieldInput control={form.control} name="phone" label="N° Téléphone" />
                    </div>
                    <div className="mb-5">
                        <FormFieldSelect control={form.control} label="Genre" name="gender" options={GENRE_OPTIONS} />
                    </div>
                    {isAdmin(session.user.role) ? (
                        <div className="mb-4">
                            <FormFieldSwitch
                                control={form.control}
                                label="Décédé"
                                name="isDead"
                                description="Définir si ce client est décédé ou pas"
                            />
                        </div>
                    ) : null}
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
