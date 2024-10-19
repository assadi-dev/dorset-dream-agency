import SubmitButton from "@/components/forms/SubmitButton";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { SUBMIT_IDLE_MESSAGE, SUBMIT_PROCESS_MESSAGE } from "@/config/messages";
import useModalState from "@/hooks/useModalState";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { gestionEmployeeSchema, gestionEmployeeSchemaType } from "./schema";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import FormFieldMultiSelect from "@/components/forms/FormFieldMultiSelect";
import useFetchSecteursOptions from "@/hooks/useFetchSecteurOptions";
import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/config/enums";

type GestionEmployeeFormProps = React.HTMLAttributes<HTMLFormElement> & {
    defaultFormValues: Partial<gestionEmployeeSchemaType>;
    save: (values: gestionEmployeeSchemaType) => void;
};
const GestionEmployeeForm = ({ defaultFormValues, save, ...props }: GestionEmployeeFormProps) => {
    const modalState = useModalState();
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<gestionEmployeeSchemaType>({
        resolver: zodResolver(gestionEmployeeSchema),
        defaultValues: { ...defaultFormValues },
    });

    const { data, isFetching } = useFetchSecteursOptions();

    const SECTEURS_OPTIONS = React.useMemo(() => {
        if (!data && isFetching) return [];
        return data.map((secteur) => {
            secteur.value = secteur.value.toString();
            return secteur;
        });
    }, [data, isFetching]);

    React.useEffect(() => {
        if (defaultFormValues?.secteur && SECTEURS_OPTIONS.length) {
            if (defaultFormValues.secteur.length) form.setValue("secteur", defaultFormValues.secteur);
        }
    }, [defaultFormValues]);

    const processing = async (values: gestionEmployeeSchemaType) => {
        try {
            await save(values);
            ToastSuccessSonner(
                `Les Information de l'employé ${defaultFormValues.lastName} ${defaultFormValues.firstName} à été mis à jour avec succès.`,
            );
            modalState.closeModal();
        } catch (error: any) {
            const message = `Raison: ${error.message}`;
            ToastErrorSonner(message);
        }
    };

    const SUBMIT_LABEL = isPending ? SUBMIT_PROCESS_MESSAGE : SUBMIT_IDLE_MESSAGE;
    const submitData: SubmitHandler<gestionEmployeeSchemaType> = async (values) => {
        startTransition(async () => processing(values));
    };

    return (
        <Form {...form}>
            <div className="mb-4 grid lg:grid-cols-2 gap-3">
                <FormFieldInput control={form.control} name="lastName" label="Nom" />
                <FormFieldInput control={form.control} name="firstName" label="Prénom" />
            </div>
            <div className="mb-4">
                {SECTEURS_OPTIONS.length ? (
                    <FormFieldMultiSelect
                        control={form.control}
                        name="secteur"
                        options={SECTEURS_OPTIONS}
                        defaultOptions={SECTEURS_OPTIONS}
                        label="Secteur"
                        iconBadgeClearButtonClassName="text-white hover:text-white"
                        loadingIndicator={true}
                    />
                ) : null}
            </div>

            <div className="mb-4 grid lg:grid-cols-2 gap-3">
                <FormFieldSelect control={form.control} name="post" label="Grade" options={GRADE_OPTIONS} />
                <FormFieldSelect control={form.control} label="Genre" name="gender" options={GENRE_OPTIONS} />
            </div>
            <div className="mb-4 grid lg:grid-cols-2 gap-3">
                <FormFieldInput control={form.control} name="phone" label="N° Téléphone" />

                <FormFieldInput control={form.control} name="iban" label="IBAN" />
            </div>
            <form {...props} onSubmit={form.handleSubmit(submitData)}>
                <DialogFooter className="pt-3">
                    <SubmitButton isLoading={isPending} className="mx-auto w-full" type="submit">
                        {SUBMIT_LABEL}
                    </SubmitButton>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default GestionEmployeeForm;
