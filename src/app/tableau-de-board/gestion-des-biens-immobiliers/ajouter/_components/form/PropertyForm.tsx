"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import FormFieldSwitch from "@/components/forms/FormFieldSwitch";
import SubmitButton from "@/components/forms/SubmitButton";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PURCHASE_TYPE } from "@/config/enums";
import React from "react";
import { useForm } from "react-hook-form";

const PropertyForm = ({ ...props }) => {
    const [isPending, startTransition] = React.useTransition();
    const form = useForm({
        defaultValues: {
            keyQuantity: 1,
        },
    });

    const processing = () => {};
    const SUBMIT_BUTTON = isPending ? "Enregistrement en cours..." : "Ajouter";

    return (
        <Form {...form}>
            <form {...props} onSubmit={form.handleSubmit(processing)}>
                <div className="mb-3">
                    <FormFieldSelect
                        control={form.control}
                        name="purchaseType"
                        label="Type"
                        options={PURCHASE_TYPE}
                        placeholder="Sélectionnez le type de vente"
                    />
                </div>
                <div className="mb-3">
                    <FormFieldInput
                        control={form.control}
                        name="name"
                        label="Nom"
                        placeholder="Nom du bien immobilier"
                    />
                </div>
                <div className="mb-3">
                    <FormFieldInput control={form.control} name="description" label="Description" />
                </div>
                <div className="mb-3">
                    <FormFieldInput
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="N° et rue du bien immobilier"
                    />
                </div>
                <div className="mb-3 lg:grid lg:grid-cols-2 gap-8">
                    <FormFieldInput
                        control={form.control}
                        name="rentalPrice"
                        label="Prix de location"
                        placeholder="Ex: 250"
                        description="Entrer la valeur en nombre"
                        type="number"
                    />
                    <FormFieldInput
                        control={form.control}
                        name="sellingPrice"
                        label="Prix de Vente"
                        placeholder="Ex: 30000"
                        description="Entrer la valeur en nombre"
                        type="number"
                    />
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-3">
                    <FormFieldSwitch
                        control={form.control}
                        name="isFurnish"
                        label="Meublé"
                        description={"Appartement meublé"}
                        className={"mb-3"}
                    />
                    <FormFieldSwitch
                        control={form.control}
                        name="isAvailable"
                        label="Disponible"
                        description={"Rendre l'appartement disponible"}
                        className={"mb-3"}
                    />
                </div>
                <div className="mb-3 grid grid-cols-2 gap-3">
                    <FormFieldInput
                        control={form.control}
                        name="keyQuantity"
                        label="Nombre de clé"
                        description={"Renseigner la quantité de clé"}
                        type="number"
                    />
                    <FormFieldInput
                        control={form.control}
                        name="keyNumber"
                        label="Numéro de laclé"
                        description={"Renseigner le numéro de la clé"}
                    />
                </div>

                <CardFooter>
                    <SubmitButton isLoading={isPending}>{SUBMIT_BUTTON}</SubmitButton>
                </CardFooter>
            </form>
        </Form>
    );
};

export default PropertyForm;
