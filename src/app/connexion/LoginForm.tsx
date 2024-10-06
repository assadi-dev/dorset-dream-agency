"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ENV } from "@/config/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema, LoginFormType } from "./schema";
import { Label } from "@/components/ui/label";
import InputPassword from "@/components/ui/inputPassword";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ToastWithAction } from "@/components/notify/Toast";
import AlertDestructive from "@/components/notify/AlertDestructive";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginFormSchema),
    });

    const router = useRouter();

    const handleSignin = async (data: LoginFormType) => {
        const email = data.email;
        const password = data.password;

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            router.push("/tableau-de-board");
            router.refresh();
        } catch (error: any) {
            setError("root", { message: "Identifiant ou mot de passe incorrect" });
        }
    };
    return (
        <form onSubmit={handleSubmit(handleSignin)} className="md:w-[80%] p-10">
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="email" className="mb-1.5">
                    Email
                </Label>
                <Input type="email" {...register("email")} placeholder="" />
            </div>
            <div className="grid w-full items-center gap-1.5 my-6">
                <Label htmlFor="password" className="mb-1.5">
                    Mot de passe
                </Label>
                <InputPassword {...register("password")} classNamButton="hover:text-secondary" />
            </div>
            <div className="grid w-full items-center gap-1.5 shadow mt-12">
                <Button className="bg-blue-500" variant="primary" type="submit">
                    Connexion
                </Button>
            </div>

            <div className="my-6">
                {errors.root && <AlertDestructive title="Erreur" description={errors.root.message} />}
            </div>
        </form>
    );
};

export default LoginForm;
