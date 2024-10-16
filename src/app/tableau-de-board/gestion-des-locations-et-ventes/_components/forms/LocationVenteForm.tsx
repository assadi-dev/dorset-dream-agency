import React from "react";
import { LocationVentesFormType, LocationVentesSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import useModalState from "@/hooks/useModalState";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import { DialogFooter } from "@/components/ui/dialog";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/forms/FormFieldInput";
import useClientOptions from "@/hooks/useClientOptions";
import FormFieldComboBox from "@/components/forms/FormFieldComboBox";
import usePropertyWithVariantOptions from "@/hooks/usePropertyWithVariantOption";

type FormType = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (value: LocationVentesFormType) => Promise<any>;
};
const LocationVenteForm = ({ save, ...props }: FormType) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();

    const clientOptions = useClientOptions();
    const propertyOptions = usePropertyWithVariantOptions();
    const CLIENT_OPTIONS = React.useMemo(() => {
        if (!clientOptions.data) return [];
        return clientOptions.data;
    }, [clientOptions.data]);
    const PROPERTY_OPTIONS = React.useMemo(() => {
        if (!propertyOptions.data) return [];
        return propertyOptions.data;
    }, [propertyOptions.data]);

    const form = useForm<LocationVentesFormType>({
        resolver: zodResolver(LocationVentesSchema),
    });
    React.useEffect(() => {
        if (!form.getValues("client")) return;
        const findClient = CLIENT_OPTIONS.find((client: any) => client.value === form.getValues("client"));
        console.log(findClient);
        if (findClient) {
            form.setValue("phone", findClient.phone);
        }
    }, [form.watch("client")]);

    React.useEffect(() => {
        if (!form.getValues("property")) return;
        const findProperty = PROPERTY_OPTIONS.find((property: any) => property.value === form.getValues("property"));
        console.log(findProperty);
        if (findProperty) {
            form.setValue("rentalPrice", findProperty.rentalPrice);
            form.setValue("sellingPrice", findProperty.sellingPrice);
            const price = findProperty.purchaseType == "Vente" ? findProperty.sellingPrice : findProperty.rentalPrice;
            form.setValue("price", price);
            form.setValue("keyQuantity", findProperty.keyQuantity);
            form.setValue("keyNumber", findProperty.keyNumber);
        }
    }, [form.watch("property")]);

    const processing = async (values: LocationVentesFormType) => {
        try {
            await save(values);
            ToastSuccessSonner("Le client à bien été créer avec success");
            modalState.closeModal();
        } catch (error: any) {
            const message = `Raison: ${error.message}`;
            ToastErrorSonner(message);
        }
    };
    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;

    const submitData: SubmitHandler<LocationVentesFormType> = async (values) => {
        startTransition(async () => processing(values));
    };

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(submitData)}>
                <div className="grid grid-cols-2 gap-3">
                    {" "}
                    <div className="mb-4">
                        <FormFieldComboBox
                            form={form}
                            control={form.control}
                            label="Clients"
                            name="client"
                            options={CLIENT_OPTIONS}
                            placeholder="Sélectionnez un clients"
                            classNameButton="w-full"
                            emptyMessage="Pas de clients enregistré"
                        />
                    </div>
                    <div className="mb-4">
                        <FormFieldComboBox
                            form={form}
                            control={form.control}
                            label="Biens immobiliers"
                            name="property"
                            options={PROPERTY_OPTIONS}
                            placeholder="Sélectionnez un Biens immobilier"
                            classNameButton="w-full"
                            emptyMessage="Pas de clients enregistré"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="N° Telephone" name="phone" />
                </div>

                <div className="mb-4">
                    <FormFieldInput control={form.control} label="Type de service" name="propertyService" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="Prix de la location - Vente" name="price" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="Nombre de clé(s)" name="keyQuantity" />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="Numéro de la clé" name="keyNumber" />
                </div>
                <DialogFooter className="pt-3">
                    <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                        {SUBMIT_LABEL}
                    </SubmitButton>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default LocationVenteForm;
