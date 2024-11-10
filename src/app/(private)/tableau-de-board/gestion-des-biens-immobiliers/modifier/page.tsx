import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import EditProperty from "../ajouter/_components/form/EditProperty";
import { formatFullDateShortTextWitHours } from "@/lib/date";
import { getOnePropertyWithVariant, propertyParser } from "@/database/drizzle/repositories/properties";
import { propertyFormType } from "../ajouter/_components/form/propertySchema";

type Params = {
    searchParams: {
        property?: string;
        name?: string;
        createdAt?: string;
        categoryProperty?: string;
    };
};
export const metadata = setTitlePage("Edition d'un biens immobiliers");
const EditPropertyPage = async ({ searchParams }: Params) => {
    const { property, name, createdAt, categoryProperty } = searchParams;

    const EditPropertyAsync = async () => {
        if (!property) throw "Property not found";

        const propertyFound = await getOnePropertyWithVariant(property);

        const propertyDefaultValue = {
            name: propertyFound.name,
            categoryProperty: String(propertyFound.category.id),
            description: propertyFound.description,
            address: propertyFound.address,
            sellingPrice: propertyFound.sellingPrice,
            rentalPrice: propertyFound.rentalPrice,
            isAvailable: propertyFound.isAvailable,
            isFurnish: propertyFound.isFurnish,
            stock: propertyFound.stock,
            variants: [],
        } satisfies propertyFormType;

        return <EditProperty defaultValues={propertyDefaultValue} />;
    };

    return (
        <PageTemplate
            title={`Modifier un bien immobilier`}
            description={`Modifier le bien immobilier ${name} Crée le ${createdAt ? formatFullDateShortTextWitHours(new Date(createdAt)) : "Date non résigné"}`}
        >
            <React.Suspense>
                <EditPropertyAsync />
            </React.Suspense>
        </PageTemplate>
    );
};

export default EditPropertyPage;
