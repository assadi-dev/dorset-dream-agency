"use client";
import React from "react";
import Image from "next/image";
import logo from "@assets/images/logo.png";
import Link from "next/link";
import { Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { handleSignInAction } from "./action";

const LoginFormServer = () => {
    const router = useRouter();
    return (
        <form
            className="login-form w-full md:w-[80%] p-10 "
            action={async (formdata) => {
                await handleSignInAction(formdata);
                router.push("/tableau-de-board");
                router.refresh();
            }}
        >
            <div className="text--center w-full flex justify-center mb-10">
                <Image src={logo} alt="Logo Dynasty 8" width={200} height={200} />
            </div>
            <div className="mb-4 min-h-8">
                <Input name="username" />
            </div>
            <div className="my-6 gap-3 min-h-8">
                <Input name="password" type="password" />
            </div>
            <div className="grid w-full items-center gap-1.5 shadow mt-12">
                <Button variant="default" className="hover:bg-green-950 ring-1 ring-green-800" type="submit">
                    Connexion
                </Button>
            </div>

            <div className="my-6 ">
                <Link
                    href={"/"}
                    className="hover:underline underline-offset-2 flex items-center gap-1 mx-auto w-fit text-sm text-primary-accent mb-3"
                >
                    <Store className=" h-4 w-4" />
                    Retour vers la page catalogue{" "}
                </Link>
            </div>
        </form>
    );
};

export default LoginFormServer;
