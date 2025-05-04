"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "./schema";
import { useRouter } from "next/navigation";

import AlertDestructive from "@/components/notify/AlertDestructive";
import SubmitButton from "@/components/forms/SubmitButton";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldInputPassword from "@/components/forms/FormFieldInputPassword";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import logo from "@assets/images/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Store } from "lucide-react";
import { handleSignInAction } from "./action";
import { ErrorAuthMessageKey } from "@/config/enums";
import { ERROR_AUTH_MESSAGE, UNKNOWN_ERROR } from "@/config/messages";

const LoginForm = () => {
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const router = useRouter();

    const handleSignIn: SubmitHandler<LoginFormType> = async (data) => {
        const username = data.username;
        const password = data.password;
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
                const res = await handleSignInAction(formData);

                router.replace("/tableau-de-board");
            } catch (error: any) {
                // console.log(error.name);
                if (error instanceof Error) {
                    //console.log(error.message);
                    const message =
                        ERROR_AUTH_MESSAGE[error.message as ErrorAuthMessageKey] ||
                        ERROR_AUTH_MESSAGE["CredentialsSignin"] ||
                        UNKNOWN_ERROR;
                    form.setError("root", { message });
                }
            }
        });
    };

    const container = React.useRef<HTMLDivElement>();

    useGSAP(
        () => {
            const boxes = container.current?.querySelectorAll(".credential-input");
            if (!boxes?.length) return;
            gsap.fromTo(
                boxes,
                {
                    opacity: 0,
                    repeat: 0,
                    x: -50,
                },
                {
                    opacity: 1,
                    repeat: 0,
                    x: 0,
                    ease: "expo.out",
                    duration: 2.5,
                    stagger: {
                        each: 0.25,
                    },
                },
            );
        },
        { scope: container },
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSignIn)}
                className="login-form w-full md:w-[80%] p-10 "
                ref={container as any}
            >
                <div className="text--center w-full flex justify-center mb-10">
                    <Image src={logo} alt="Logo Dynasty 8" width={200} height={200} />
                </div>
                <div className="mb-4 min-h-8">
                    <FormFieldInput
                        control={form.control}
                        name="username"
                        placeholder="Email"
                        label="Email"
                        autoComplete="username"
                        classNameFormItem="credential-input opacity-0"
                    />
                </div>
                <div className="my-6 gap-3 min-h-8">
                    <FormFieldInputPassword
                        control={form.control}
                        name="password"
                        label="Mot de passe"
                        autoComplete="current-password"
                        classNamButton="hover:text-secondary"
                        placeholder="Mot de passe"
                        classNameFormItem="credential-input opacity-0"
                    />
                </div>
                <div className="grid w-full items-center gap-1.5 shadow mt-12">
                    <SubmitButton
                        isLoading={isPending}
                        variant="default"
                        className="hover:bg-green-950 ring-1 ring-green-800"
                        type="submit"
                    >
                        Connexion
                    </SubmitButton>
                </div>

                <div className="my-6 ">
                    <Link
                        href={"/"}
                        className="hover:underline underline-offset-2 flex items-center gap-1 mx-auto w-fit text-sm text-primary-accent mb-3"
                    >
                        <Store className=" h-4 w-4" />
                        Retour vers la page catalogue{" "}
                    </Link>
                    {form.formState.errors.root && (
                        <AlertDestructive title="Erreur" description={form.formState.errors.root.message} />
                    )}
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
