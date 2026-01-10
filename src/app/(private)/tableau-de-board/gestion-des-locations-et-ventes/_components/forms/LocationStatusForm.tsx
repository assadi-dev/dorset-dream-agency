import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LocationStatusFormSchema, LocationStatusFormSchemaInfer } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import { STATUS_OPTIONS } from "../../helpers";
import SubmitButton from "@/components/forms/SubmitButton";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";

type LocationStatusFormProps = {
    onConfirmSubmit: (values: LocationStatusFormSchemaInfer) => Promise<void>;
    defaultValues: Partial<LocationStatusFormSchemaInfer>;
};
const LocationStatusForm = ({ defaultValues, onConfirmSubmit }: LocationStatusFormProps) => {
    const [isSubmitting, startSubmitting] = React.useTransition();

    const form = useForm<LocationStatusFormSchemaInfer>({
        resolver: zodResolver(LocationStatusFormSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const submit: SubmitHandler<LocationStatusFormSchemaInfer> = async (values) => {
        startSubmitting(async () => {
            try {
                await onConfirmSubmit(values);
                ToastSuccessSonner("Mise à jour du statut effectué");
            } catch (error) {
                console.error(error);
                ToastErrorSonner("Erreur sur le changement de status");
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="min-w-[32vw] space-y-2">
                <FormFieldSelect control={form.control} name="status" options={STATUS_OPTIONS} />
                <div>
                    <SubmitButton isLoading={isSubmitting} className="w-full">
                        Confirmer
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
};

export default LocationStatusForm;
