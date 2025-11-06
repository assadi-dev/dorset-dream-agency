"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import FormFieldSwitch from "@/components/forms/FormFieldSwitch";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { propertyFormType } from "./propertySchema";
import FormFieldTextarea from "@/components/forms/FormFieldTextarea";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import StockChoice from "./StockChoice";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ToastInfoSonner } from "@/components/notify/Sonner";
import { DescriptionModal } from "../../../_components/DescriptionModal";

type PropertyFormProps = React.HTMLAttributes<HTMLDivElement> & {
    form: UseFormReturn<propertyFormType>;
};
const PropertyForm = ({ form, ...props }: PropertyFormProps) => {
    const categoryQuery = useCategoryPropertiesOptions();

    const ENUM_PROPERTY_CATEGORIES = React.useMemo(() => {
        if (categoryQuery.data) return categoryQuery.data;
        return [];
    }, [categoryQuery.data]);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = React.useState(false);
    const handleDescriptionSave = (description: string) => {
        form.setValue("description", description);
        ToastInfoSonner({
            title: `Description enregistrée`,
            description: `La description de la propriété a été mise à jour.`,
        });
    };

    const watchDescription = form.watch("description");
    return (
        <>
            <CardContent {...props} className={cn("h-full", props.className)}>
                <div className="mb-3 lg:grid lg:grid-cols-2 gap-3">
                    <FormFieldInput
                        control={form.control}
                        name="name"
                        label="Nom"
                        placeholder="Nom du bien immobilier"
                    />
                    <FormFieldSelect
                        control={form.control}
                        name="categoryProperty"
                        label="Type de propriété"
                        options={ENUM_PROPERTY_CATEGORIES}
                        placeholder="Sélectionnez le type du bien immobilier"
                    />
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
                        min={-1}
                    />
                    <FormFieldInput
                        control={form.control}
                        name="sellingPrice"
                        label="Prix de Vente"
                        placeholder="Ex: 30000"
                        description="Entrer la valeur en nombre"
                        type="number"
                        min={-1}
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
                <div className="mb-3">
                    <StockChoice label="Stockage en kg" />
                </div>

                <div className="mb-3">
                    <div className="pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDescriptionModalOpen(true)}
                            className="w-full md:w-auto"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {watchDescription!.length > 0 ? "Modifier la description" : "Ajouter une description"}
                        </Button>
                        {watchDescription && (
                            <p className="mt-2 text-sm text-muted-foreground">Description ajoutée ✓</p>
                        )}
                    </div>
                </div>
            </CardContent>
            <DescriptionModal
                open={isDescriptionModalOpen}
                onOpenChange={setIsDescriptionModalOpen}
                initialDescription={watchDescription ?? ""}
                onSave={handleDescriptionSave}
            />
        </>
    );
};

export default PropertyForm;
