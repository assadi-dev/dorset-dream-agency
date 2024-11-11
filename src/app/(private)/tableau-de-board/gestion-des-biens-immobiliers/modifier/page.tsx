import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import EditProperty from "../ajouter/_components/form/EditProperty";
import { formatFullDateShortTextWitHours } from "@/lib/date";
import { getOnePropertyWithVariant, propertyParser } from "@/database/drizzle/repositories/properties";
import { propertyFormType } from "../ajouter/_components/form/propertySchema";
import { getOneVariantWithGallery } from "@/database/drizzle/repositories/variants";

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

        const retrieveVariants = [];
        const propertyFound = await getOnePropertyWithVariant(property);
        for (const variant of propertyFound.variants) {
            const result = await getOneVariantWithGallery(variant.id);
            retrieveVariants.push(result);
        }

        const propertyDefaultValue = {
            id: propertyFound.id,
            name: propertyFound.name,
            categoryProperty: String(propertyFound.category.id),
            description: propertyFound.description,
            address: propertyFound.address,
            sellingPrice: propertyFound.sellingPrice,
            rentalPrice: propertyFound.rentalPrice,
            isAvailable: propertyFound.isAvailable,
            isFurnish: propertyFound.isFurnish,
            stock: propertyFound.stock,
            variants: retrieveVariants,
        } satisfies propertyFormType;

        return <EditProperty propertyID={Number(property)} defaultValues={propertyDefaultValue} />;
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
