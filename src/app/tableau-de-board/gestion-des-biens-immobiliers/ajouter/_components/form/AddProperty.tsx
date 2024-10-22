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
import { insertProperty } from "@/database/drizzle/repositories/properties";
import { createVariantGalleryApi } from "./helpers";
import { usePathname, useRouter } from "next/navigation";

const AddProperty = () => {
    const pathname = usePathname();
    const router = useRouter();
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
        },
    });

    const processing: SubmitHandler<propertyFormType> = (values) => {
        startTransition(async () => {
            try {
                if (values.variants.length === 0) throw new Error("Vous devais mettre au minimum 1 variante");
                await wait(1000);

                if (values.variants && values.variants.length > 0) {
                    const validateInputs = await createPropertyDto(values);
                    if (validateInputs.error) throw validateInputs.error;

                    const property = await insertProperty(validateInputs.data);
                    const propertyID = String(property.id);
                    for (const variant of values.variants) {
                        const formData = new FormData();
                        formData.append("name", variant.name);
                        formData.append("propertyID", propertyID);

                        if (variant.files.length > 0) {
                            for (const file of variant.files) {
                                formData.append("files", file);
                            }
                            await createVariantGalleryApi(formData);
                        }
                    }
                }

                ToastSuccessSonner("Le bien immobilier à été créer avec success !");
                form.reset();
                router.push(pathname);
                router.refresh();
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

export default AddProperty;
