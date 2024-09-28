import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ENV } from "@/config/auth.config";
import React from "react";

const Connexion = async () => {
    const onSubmit = async (event) => {
        "use server";
        const email = event.get("email");
        const password = event.get("password");

        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: ENV.NEXT_AUTH_SIGN_IN_SUCCESS,
            });
        } catch (error: any) {
            throw error;
        }
    };

    return (
        <Card className="max-w-[50%] mx-auto mt-12">
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
            </CardHeader>

            <form action={onSubmit}>
                <CardContent>
                    <Input type="email" name="email" />
                    <Input type="password" name="password" />
                </CardContent>
                <CardFooter>
                    <Button type="submit">Connexion</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default Connexion;
