"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/forms/SubmitButton";
import { propertyFormType, propertySchema } from "./propertySchema";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyForm from "./PropertyForm";
import { zodResolver } from "@hookform/resolvers/zod";
import AddVariantProperty from "./AddVariantProperty";
import ModalProvider from "@/components/Modals/ModalProvider";
import { createPropertyDto } from "../../actions/dto/propertyDTO";
import { insertProperty, updateProperty } from "@/database/drizzle/repositories/properties";
import { createVariantGalleryApi, updatePropertyApi } from "./helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditPropertyProps = {
    propertyID: number | string;
    defaultValues?: propertyFormType | null;
};
const EditProperty = ({ propertyID, defaultValues }: EditPropertyProps) => {
    const queryClient = useQueryClient();

    const [isPending, startTransition] = React.useTransition();
    const form = useForm<propertyFormType>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            address: "",
            description: "",
            isAvailable: false,
            isFurnish: true,
            factoryPrice: 0,
            sellingPrice: 0,
            rentalPrice: 0,
            variants: [],
            stock: 0,
            ...defaultValues,
        },
    });

    const processing: SubmitHandler<propertyFormType> = async (values) => {
        startTransition(async () => {
            try {
                if (values.variants.length === 0) throw new Error("Vous devais mettre au minimum 1 variante");
                await wait(1000);

                if (values.variants && values.variants.length > 0) {
                    const validateInputs = await createPropertyDto(values);
                    if (validateInputs.error) throw validateInputs.error;

                    await updatePropertyApi(propertyID, validateInputs.data);
                    queryClient.refetchQueries({ queryKey: ["LIST_IMMOBILIER_GESTION"] });
                }

                ToastSuccessSonner("Le bien immobilier à été mis à jours avec success !");
            } catch (error: any) {
                if (error instanceof Error) ToastErrorSonner(error.message);
            }
        });
    };

    const SUBMIT_BUTTON = isPending ? "Enregistrement en cours..." : "Enregistrer";

    return (
        <FormProvider {...form}>
            <ModalProvider>
                <form onSubmit={form.handleSubmit(processing)}>
                    <div className="lg:grid lg:grid-cols-[0.82fr,1fr] h-[calc(95vh-200px)] pt-3 gap-3">
                        <ScrollArea className="w-full">
                            <PropertyForm form={form} className="px-8" />
                        </ScrollArea>
                        <div>
                            <div className="flex justify-end">
                                <SubmitButton isLoading={isPending}>{SUBMIT_BUTTON}</SubmitButton>
                            </div>
                            <div className="p-3 max-h-[calc(90vh-200px)] overflow-hidden ">
                                <AddVariantProperty />
                            </div>
                        </div>
                    </div>
                </form>
            </ModalProvider>
        </FormProvider>
    );
};

export default EditProperty;
