import React from "react";
import { LocationVentesFormType, LocationVentesSchema, PROPERTY_TYPE_ENUM } from "./schema";
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
import FormFieldSelect from "@/components/forms/FormFieldSelect";

type FormType = React.FormHTMLAttributes<HTMLFormElement> & {
    defaultFormValues?: Partial<LocationVentesFormType>;
    save: (value: LocationVentesFormType) => Promise<any>;
};
const LocationVenteForm = ({ defaultFormValues, save, ...props }: FormType) => {
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
        defaultValues: { ...defaultFormValues },
    });

    React.useEffect(() => {
        if (!form.getValues("client") && !CLIENT_OPTIONS) return;
        const findClient = CLIENT_OPTIONS.find((client: any) => client.value === form.getValues("client"));

        if (findClient) {
            form.setValue("phone", findClient.phone);
        }
    }, [form.watch("client"), CLIENT_OPTIONS]);

    React.useEffect(() => {
        if (!form.getValues("propertyService") && !form.getValues("property")) return;
        const findProperty = PROPERTY_OPTIONS.find((property: any) => property.value === form.getValues("property"));
        if (!findProperty) return;

        const typeService = form.getValues("propertyService").toLowerCase();
        let vente = 0;

        if (typeService.includes("vente")) {
            vente = findProperty.sellingPrice;
        } else if (typeService.includes("location")) {
            vente = findProperty.rentalPrice;
        }
        form.setValue("price", vente);
    }, [form.watch("propertyService")]);

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
                            classNameButton="w-full text-xs "
                            emptyMessage="Pas de clients enregistré"
                            classNameListOptions="lg:w-[300px] text-nowrap text-xs"
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
                            classNameButton="w-full text-xs"
                            emptyMessage="Pas de biens enregistré"
                            classNameListOptions="lg:w-[300px] text-nowrap text-xs"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="N° Téléphone" name="phone" />
                </div>

                <div className="mb-4">
                    <FormFieldSelect
                        control={form.control}
                        label="Type de service"
                        name="propertyService"
                        options={PROPERTY_TYPE_ENUM}
                    />
                </div>
                <div className="mb-4">
                    <FormFieldInput
                        control={form.control}
                        label="Prix de la location - Vente"
                        name="price"
                        disabled
                        className="text-black opacity-100 font-semibold"
                    />
                </div>
                <div className="mb-4">
                    <FormFieldInput control={form.control} label="Nombre de clé(s)" name="keyQuantity" type="number" />
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
