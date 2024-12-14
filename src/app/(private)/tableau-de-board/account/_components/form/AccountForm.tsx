import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/forms/SubmitButton";
import { Session } from "../../type";
import { useSession } from "next-auth/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { PasswordFormType, PasswordSchema, UsernameFormType, usernameSchema } from "./schema";
import InputPassword from "@/components/ui/inputPassword";
import { updateEmployeePassword, updateUsernameEmployee } from "./action";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import { Separator } from "@/components/ui/separator";

const AccountForm = () => {
    const { data } = useSession();

    const [isPendingPass, startTransitionPass] = React.useTransition();
    const [isPending, startTransition] = React.useTransition();
    const formPassword = useForm<PasswordFormType>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const formUsername = useForm<UsernameFormType>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: data?.user?.email as string,
        },
    });

    const savePassword: SubmitHandler<PasswordFormType> = async (values) => {
        startTransitionPass(async () => {
            try {
                const formData = new FormData();

                formData.append("password", values.password);
                formData.append("confirmPassword", values.confirmPassword);
                await updateEmployeePassword(formData);
                ToastSuccessSonner("Votre mot de passe  à été mise à jour !");
            } catch (error: any) {
                if (error instanceof Error) {
                    ToastErrorSonner(`Votre mot de passe n'a pas été mise à jour cause: ${error.message}`);
                }
            }
        });
    };

    const saveUsername: SubmitHandler<UsernameFormType> = async (values) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("username", values.username);
                await updateUsernameEmployee(formData);
                ToastSuccessSonner("L'email d'identification de votre compte à été mise à jour !");
            } catch (error: any) {
                if (error instanceof Error) {
                    ToastErrorSonner(
                        `Les informations de votre compte n'a pas été mise à jour cause: ${error.message}`,
                    );
                }
            }
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Information de connexion</CardTitle>
                <CardDescription>Mettre à jours votre mot de passe ou votre email de connexion.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 min-h-[58vh] flex flex-col justify-between">
                <FormProvider {...formUsername}>
                    <form className="flex flex-col gap-8" onSubmit={formUsername.handleSubmit(saveUsername)}>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={formUsername.control}
                                label="Identifiant"
                                autoComplete="username"
                                name="username"
                            />
                        </div>
                        <div className="space-y-1">
                            <SubmitButton className="w-full" isLoading={isPending}>
                                Valider mon identifiant
                            </SubmitButton>
                        </div>
                    </form>
                </FormProvider>
                <Separator />
                <FormProvider {...formPassword}>
                    <form onSubmit={formPassword.handleSubmit(savePassword)} className="flex flex-col gap-8">
                        <div className="space-y-1">
                            <FormFieldInputPassword
                                control={formPassword.control}
                                label="Nouveau Mot de passe"
                                description="Votre mot de passe doit contenir au moins 6 caractères."
                                name="password"
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInputPassword
                                name="confirmPassword"
                                control={formPassword.control}
                                label="Confirmation"
                            />
                        </div>
                        <div className="space-y-1">
                            <SubmitButton className="w-full" isLoading={isPendingPass}>
                                Valider mon mot de passe
                            </SubmitButton>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};

export default AccountForm;
