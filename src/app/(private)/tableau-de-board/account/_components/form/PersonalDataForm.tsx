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
import { UserData } from "../../type";
import { formatFullDateShortText } from "@/lib/date";
import { usePathname, useRouter } from "next/navigation";

type PersonalDataFormProps = {
    userData: UserData;
};
const PersonalDataForm = ({ userData }: PersonalDataFormProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<EmployeeDataFormType>({
        resolver: zodResolver(EmployeeDataForm),
        defaultValues: {
            iban: userData.iban,
            lastName: userData.lastName || "",
            firstName: userData.firstName || "",
            phone: userData.phone || "",
        },
    });
    const session = useSession();

    const savePersonnelData: SubmitHandler<EmployeeDataFormType> = async (values) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("iban", values.iban);
                formData.append("lastName", values.lastName);
                formData.append("firstName", values.firstName);
                formData.append("phone", values.phone);
                await updateEmployeeData(formData);

                await session.update({
                    ...session,
                    data: {
                        ...session.data,
                        user: { ...session?.data?.user, name: `${values.firstName} ${values.lastName}` },
                    },
                });
                ToastSuccessSonner("Votre profile à été mise à jour !");
                router.push(pathname);
                router.refresh();
            } catch (error: any) {
                if (error instanceof Error) {
                    ToastErrorSonner(`Votre profile n'a pas été mise à jour cause: ${error.message}`);
                }
            }
        });
    };
    // const mutation = useMutation({mutationKey:[QUERY_EMPLOYEE_ACCOUNT_QUERY.UPDATE_EMPLOYEE_DATA],mutationFn:})
    console.log(form.formState.errors);

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
                                label="IBAN"
                                placeholder="IBAN de l'employé"
                                name="iban"
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="Nom"
                                placeholder="Nom de l'employé"
                                name="lastName"
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="Prénom"
                                placeholder="Prénom de l'employé"
                                name="firstName"
                            />
                        </div>
                        <div className="space-y-1">
                            <FormFieldInput
                                control={form.control}
                                label="N° Téléphone"
                                placeholder="EX: 555-1234"
                                name="phone"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full flex flex-col gap-5">
                            {userData.createdAt && (
                                <CardDescription>
                                    {`Compte créer le  ${formatFullDateShortText(new Date(userData.createdAt?.toISOString()))}`}{" "}
                                </CardDescription>
                            )}
                            <SubmitButton type="submit" className="w-full" isLoading={isPending}>
                                Valider
                            </SubmitButton>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    );
};

export default PersonalDataForm;
