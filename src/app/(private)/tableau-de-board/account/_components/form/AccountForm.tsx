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
import { PasswordFormType, PasswordSchema } from "./schema";
import InputPassword from "@/components/ui/inputPassword";
import { updateEmployeePassword } from "./action";
import FormFieldInput from "@/components/forms/FormFieldInput";

const AccountForm = () => {
    const { data } = useSession();

    const [isPending, startTransition] = React.useTransition();
    const form = useForm<PasswordFormType>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            username: String(data?.user?.email),
        },
    });

    const savePassword: SubmitHandler<PasswordFormType> = async (values) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("username", values.username);
                formData.append("password", values.password);
                formData.append("confirmPassword", values.confirmPassword);
                await updateEmployeePassword(formData);
                ToastSuccessSonner("Les information de votre compte à été mise à jour !");
            } catch (error: any) {
                if (error instanceof Error) {
                    ToastErrorSonner(`Les information de votre compte n'a pas été mise à jour cause: ${error.message}`);
                }
            }
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(savePassword)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Information de connexion</CardTitle>
                        <CardDescription>Mettre à votre mot de passe ou votre email de connexion.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 min-h-[50vh]">
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="Identifiant"
                                {...form.register("username")}
                                autoComplete="username"
                                disabled
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Nouveau mot de passe</Label>
                            <InputPassword {...form.register("password")} autoComplete="new-password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirmer votre mot de passe</Label>
                            <InputPassword {...form.register("confirmPassword")} autoComplete="new-password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton className="w-full" isLoading={isPending}>
                            Valider
                        </SubmitButton>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    );
};

export default AccountForm;
