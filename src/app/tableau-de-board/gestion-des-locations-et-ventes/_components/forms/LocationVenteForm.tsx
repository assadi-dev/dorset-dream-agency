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
import FormFieldCustom from "@/components/forms/FormFieldCustom";
import { Input } from "@/components/ui/input";

type FormType = React.FormHTMLAttributes<HTMLFormElement> & {
    save: (value: LocationVentesFormType) => Promise<any>;
};
const LocationVenteForm = ({ save, ...props }: FormType) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<LocationVentesFormType>({
        resolver: zodResolver(LocationVentesSchema),
    });

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
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Client" name="client">
                        <Input {...form.register("client")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="N° Telephone" name="phone">
                        <Input {...form.register("phone")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Type de bien" name="property">
                        <Input {...form.register("property")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Type de service" name="propertyService">
                        <Input {...form.register("propertyService")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Prix de la location - Vente" name="price">
                        <Input {...form.register("price")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Nombre de clé(s)" name="keyQuantity">
                        <Input {...form.register("keyQuantity")} />
                    </FormFieldCustom>
                </div>
                <div className="mb-4">
                    <FormFieldCustom control={form.control} label="Numéro de la clé" name="keyNumber">
                        <Input {...form.register("keyNumber")} />
                    </FormFieldCustom>
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
