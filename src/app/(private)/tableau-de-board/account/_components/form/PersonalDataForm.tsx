"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/forms/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { QUERY_EMPLOYEE_ACCOUNT_QUERY } from "../helpers";
import { updateEmployeeData } from "./action";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeDataForm, EmployeeDataFormType } from "./schema";

const PersonalDataForm = () => {
    const [isPending, startTransition] = React.useTransition();
    const session = useSession();
    const form = useForm<EmployeeDataFormType>({
        resolver: zodResolver(EmployeeDataForm),
    });
    const savePersonnelData: SubmitHandler<EmployeeDataFormType> = async (values) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("email", values.email);
                updateEmployeeData(formData);
                ToastSuccessSonner("Votre profile à été mise à jour !");
            } catch (error: any) {
                if (error instanceof Error) {
                    ToastErrorSonner("Votre profile n'a pas été mise à jour!");
                }
            }
        });
    };
    // const mutation = useMutation({mutationKey:[QUERY_EMPLOYEE_ACCOUNT_QUERY.UPDATE_EMPLOYEE_DATA],mutationFn:})
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(savePersonnelData)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Info Personnelle</CardTitle>
                        <CardDescription>Mettre à jour vos informations personnelle.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 min-h-[50vh]">
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="Nom"
                                placeholder="Nom de l'employé"
                                {...form.register("lastName")}
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="Prénom"
                                placeholder="Prénom de l'employé"
                                {...form.register("firstName")}
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="N° Téléphone"
                                placeholder="EX: 555-1234"
                                {...form.register("phone")}
                            />
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

export default PersonalDataForm;
