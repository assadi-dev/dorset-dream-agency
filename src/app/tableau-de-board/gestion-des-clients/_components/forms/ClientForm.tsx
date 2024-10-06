"use client";

import React from "react";
import { Form, FormControl } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabelWithErrorMessage from "@/components/forms/InputLabelWithErrorMessage";
import FormFieldCustom from "@/components/forms/FormFieldCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema, ClientFormType } from "./schema";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { wait } from "@/lib/utils";
import useModalState from "@/hooks/useModalState";
import withFormField from "@/HOC/withFormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenderType } from "@/app/types";

type FormType = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (value: ClientFormType) => void;
};
const ClientForm = ({ save, ...props }: FormType) => {
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

    const submitData: SubmitHandler<ClientFormType> = async (values) => {
        try {
            startTransition(async () => {
                await wait(3000);
                save(values);
                modalState.closeModal();
            });
        } catch (error) {
            console.warn("Une erreur est survenu: ${error.message");
        }
    };

    const SUBMIT_LABEL = isPending ? "traitement en cours..." : "Enregistrer";

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit((values) => submitData(values))}>
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
                    <Button className="mx-auto w-full" type="submit">
                        {SUBMIT_LABEL}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default ClientForm;
