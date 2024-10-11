"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import FormFieldSwitch from "@/components/forms/FormFieldSwitch";
import { PURCHASE_TYPE } from "@/config/enums";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PropertyForm = ({ form, ...props }) => {
    const categoryQuery = useCategoryPropertiesOptions();

    const ENUM_PROPERTY_CATEGORIES = React.useMemo(() => {
        if (categoryQuery.data) return categoryQuery.data;
        return [];
    }, [categoryQuery.data]);

    return (
        <div {...props}>
            <div className="mb-3 lg:grid lg:grid-cols-2 gap-8">
                <FormFieldSelect
                    control={form.control}
                    name="categoryProperty"
                    label="Type de propriété"
                    options={ENUM_PROPERTY_CATEGORIES}
                    placeholder="Sélectionnez le type du bien immobilier"
                />
                <FormFieldSelect
                    control={form.control}
                    name="purchaseType"
                    label="Type"
                    options={PURCHASE_TYPE}
                    placeholder="Sélectionnez le type d'acquisition"
                />
            </div>
            <div className="mb-3">
                <FormFieldInput control={form.control} name="name" label="Nom" placeholder="Nom du bien immobilier" />
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
                    min={0}
                />
                <FormFieldInput
                    control={form.control}
                    name="sellingPrice"
                    label="Prix de Vente"
                    placeholder="Ex: 30000"
                    description="Entrer la valeur en nombre"
                    type="number"
                    min={0}
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
                    label="Disponibilité"
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
                    min={0}
                />
                <FormFieldInput
                    control={form.control}
                    name="keyNumber"
                    label="Numéro de laclé"
                    description={"Renseigner le numéro de la clé"}
                />
            </div>
        </div>
    );
};

export default PropertyForm;
