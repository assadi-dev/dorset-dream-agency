"use client";

import React from "react";
import { Form, FormControl } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import FormFieldCustom from "@/components/forms/FormFieldCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema, ClientFormType } from "./schema";
import { DialogFooter } from "@/components/ui/dialog";
import useModalState from "@/hooks/useModalState";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenderType } from "@/app/types";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import SubmitButton from "@/components/forms/SubmitButton";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";

type ClientFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (value: ClientFormType) => Promise<any>;
};
const ClientForm = ({ save, ...props }: ClientFormProps) => {
    const [isPending, startTransition] = React.useTransition();

    const modalState = useModalState();

    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            phone: "",
            gender: "Male",
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
                    <FormFieldCustom control={form.control} name="lastName" label="Nom">
                        <Input {...form.register("lastName")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} name="firstName" label="Prénom">
                        <Input {...form.register("firstName")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} name="phone" label="N° Téléphone">
                        <Input {...form.register("phone")} placeholder="555-123456" />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Genre" name="gender">
                        <Select
                            onValueChange={(value: GenderType) => form.setValue("gender", value)}
                            name="gender"
                            defaultValue={form.getValues("gender")}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez le genre" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Male">Homme</SelectItem>
                                <SelectItem value="Female">Femme</SelectItem>
                            </SelectContent>
                        </Select>
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

export default ClientForm;
