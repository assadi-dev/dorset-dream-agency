"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";
import { propertyFormType, propertySchema } from "./propertySchema";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyForm from "./PropertyForm";
import { zodResolver } from "@hookform/resolvers/zod";

const AddProperty = () => {
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<propertyFormType>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            description: "",
            isAvailable: false,
            isFurnish: true,
            keyQuantity: 1,
            factoryPrice: 0,
            keyNumber: "",
        },
    });

    const processing: SubmitHandler<propertyFormType> = (values) => {
        startTransition(async () => {
            try {
                await wait(3000);
                ToastSuccessSonner("Le bien immobilier à été créer avec success !");
            } catch (error) {
                if (error instanceof Error) ToastErrorSonner(error.message);
            }
        });
    };

    const SUBMIT_BUTTON = isPending ? "Enregistrement en cours..." : "Enregistrer";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(processing)}>
                <div className="lg:grid lg:grid-cols-[0.78fr,1fr] h-[calc(95vh-200px)] pt-3 gap-3">
                    <ScrollArea className="w-fit">
                        <PropertyForm form={form} className="px-8" />
                    </ScrollArea>
                    <div>
                        <div className="flex justify-end">
                            <SubmitButton isLoading={isPending}>{SUBMIT_BUTTON}</SubmitButton>
                        </div>
                        <ScrollArea className="p-3 h-[calc(90vh-200px)] overflow-y-auto overflow-x-hidden ">
                            <div className="h-full  bg-foreground rounded-xl "></div>
                        </ScrollArea>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default AddProperty;
