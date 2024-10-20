"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "./schema";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import AlertDestructive from "@/components/notify/AlertDestructive";
import SubmitButton from "@/components/forms/SubmitButton";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import { Form } from "@/components/ui/form";

const LoginForm = () => {
    const [isPending, startTransition] = React.useTransition();
    const searchParams = useSearchParams();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const router = useRouter();

    React.useEffect(() => {
        if (searchParams.get("error")) {
            form.setError("root", { message: "Identifiant ou mot de passe incorrect" });
        }
    }, [searchParams, form]);

    const handleSignIn: SubmitHandler<LoginFormType> = async (data) => {
        const username = data.username;
        const password = data.password;
        startTransition(async () => {
            try {
                await signIn("credentials", {
                    username,
                    password,
                    redirectTo: "/tableau-de-board",
                });

                /*       router.push("/tableau-de-board");
                router.refresh(); */
            } catch (error: any) {
                form.setError("root", { message: "Identifiant ou mot de passe incorrect" });
                throw error;
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className="md:w-[80%] p-10">
                <div className="mb-4">
                    <FormFieldInput
                        control={form.control}
                        name="username"
                        placeholder="Email"
                        label="Email"
                        autoComplete="username"
                    />
                </div>
                <div className="my-6 gap-3">
                    <FormFieldInputPassword
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        autoComplete="current-password"
                        classNamButton="hover:text-secondary"
                        placeholder="Mot de passe"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 shadow mt-12">
                    <SubmitButton isLoading={isPending} variant="default" className="bg-blue-500" type="submit">
                        Connexion
                    </SubmitButton>
                </div>

                <div className="my-6">
                    {form.formState.errors.root && (
                        <AlertDestructive title="Erreur" description={form.formState.errors.root.message} />
                    )}
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
