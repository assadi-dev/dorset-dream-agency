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
import { updatePropertyApi, updateVariantGalleryApi } from "../form/helpers";
import useRouteRefresh from "@/hooks/useRouteRefresh";

type EditPropertyProps = {
    propertyID: number | string;
    defaultValues?: propertyFormType | null;
};
const EditProperty = ({ propertyID, defaultValues }: EditPropertyProps) => {
    const router = useRouteRefresh();
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
    console.log(form.watch("variants"));
    const processing: SubmitHandler<propertyFormType> = async (values) => {
        startTransition(async () => {
            try {
                if (values.variants.length === 0) throw new Error("Vous devais mettre au minimum 1 variante");
                await wait(1000);

                if (values.variants && values.variants.length > 0) {
                    const validateInputs = await createPropertyDto(values);
                    if (validateInputs.error) throw validateInputs.error;

                    await updatePropertyApi(propertyID, validateInputs.data);

                    //Mise à jours des variants
                    for (const variant of values.variants) {
                        const formData = new FormData();

                        variant.name && formData.append("name", variant.name as string);
                        formData.append("variantID", variant.id as string);
                        values.id && formData.append("propertyID", String(values.id));

                        if (variant.files) {
                            for (const fileObj of variant.files) {
                                if (fileObj.file instanceof File) formData.append("files", fileObj.file);
                            }
                        }

                        const response = await updateVariantGalleryApi(formData);
                        if (response.data) {
                            //Mise à jour des id des variants stockées dans le state du formulaire
                            const variantsCollections = form.getValues("variants");
                            const variantsUpdated = variantsCollections.map((v: any) => {
                                if (v.id == variant.id) {
                                    v.id = response.data.variant.id;
                                }
                                return v;
                            });

                            form.setValue("variants", variantsUpdated);
                        }
                    }
                }

                ToastSuccessSonner("Le bien immobilier à été mis à jours avec success !");
                router.refreshWithParams();
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
