"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/forms/SubmitButton";
import { propertyFormType, propertySchema } from "../form/propertySchema";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { wait } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyForm from "../form/PropertyForm";
import { zodResolver } from "@hookform/resolvers/zod";
import AddVariantProperty from "./AddVariantProperty";
import ModalProvider from "@/components/Modals/ModalProvider";
import { createPropertyDto } from "../../actions/dto/propertyDTO";
import { insertProperty } from "@/database/drizzle/repositories/properties";
import { createVariantGalleryApi } from "../form/helpers";
import { Card } from "@/components/ui/card";

const AddProperty = () => {
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<propertyFormType>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            categoryProperty: null,
            address: "",
            description: "",
            isAvailable: false,
            isFurnish: true,
            factoryPrice: 0,
            sellingPrice: 0,
            rentalPrice: 0,
            variants: [],
            stock: 0,
            typeStock: 0,
        },
    });

    const processing: SubmitHandler<propertyFormType> = (values) => {
        startTransition(async () => {
            try {
                if (values.variants.length === 0) throw new Error("Vous devais mettre au minimum 1 variante");
                if (Number(values.typeStock) < 1) values.stock = values.typeStock;
                await wait(1000);
                if (values.variants && values.variants.length > 0) {
                    const validateInputs = await createPropertyDto(values);
                    if (validateInputs.error) throw validateInputs.error;
                    const property = await insertProperty(validateInputs.data);
                    const propertyID = String(property.id);
                    for (const variant of values.variants) {
                        const formData = new FormData();
                        variant.name && formData.append("name", variant.name);
                        formData.append("propertyID", propertyID);

                        if (variant.files && variant.files.length > 0) {
                            for (const file of variant.files) {
                                if (file.file instanceof File) {
                                    formData.append("files", file.file);
                                    const indexIsCover = variant.files.findIndex((it) => it.isCover) || "0";
                                    indexIsCover && formData.append("isCoverIndex", indexIsCover.toString());
                                }
                            }

                            await createVariantGalleryApi(formData);
                        }
                    }
                }

                ToastSuccessSonner("Le bien immobilier à été créer avec success !");
                // form.reset();
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
                    <div className="flex justify-end w-full">
                        <SubmitButton isLoading={isPending}>{SUBMIT_BUTTON}</SubmitButton>
                    </div>
                    <div className="lg:grid lg:grid-cols-[0.82fr,1fr] h-[78vh] gap-5 items-center py-5">
                        <Card className="bg-white shadow-lg h-full">
                            <ScrollArea className="w-full h-full">
                                <PropertyForm form={form} className="h-full p-5" />
                            </ScrollArea>
                        </Card>

                        <div className="h-full overflow-hidden">
                            <AddVariantProperty />
                        </div>
                    </div>
                </form>
            </ModalProvider>
        </FormProvider>
    );
};

export default AddProperty;
