"use client";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import SubmitButton from "@/components/forms/SubmitButton";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { DialogFooter } from "@/components/ui/dialog";
import React from "react";
import { NewPasswordFormType, newPasswordSchema, userEditFormType } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import { Form } from "@/components/ui/form";

type AccountNewPasswordProps = {
    defaultFormValues: Partial<NewPasswordFormType>;
    save: (values: Omit<NewPasswordFormType, "username">) => Promise<any>;
};
const AccountNewPasswordForm = ({ save, defaultFormValues, ...props }: AccountNewPasswordProps) => {
    const [isPending, startTransition] = React.useTransition();
    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;

    const form = useForm<NewPasswordFormType>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            ...defaultFormValues,
        },
    });

    const processing: SubmitHandler<NewPasswordFormType> = async (values) => {
        startTransition(async () => {
            try {
                await save(values);
                ToastSuccessSonner(`Le mot de passe du compte ${defaultFormValues.username} à été mise à jours`);
            } catch (error: any) {
                const message = `Raison: ${error.message}`;
                ToastErrorSonner(message);
            }
        });
    };

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(processing)}>
                <div className="mb-4">
                    <FormFieldInputPassword
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        description="minimum 6 caractères"
                        autoComplete="new-password"
                    />
                </div>
                <div className="mb-4">
                    <FormFieldInputPassword
                        control={form.control}
                        name="confirmPassword"
                        label="Confirmation"
                        autoComplete="new-password"
                    />
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

export default AccountNewPasswordForm;
