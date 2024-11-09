import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import EditProperty from "../ajouter/_components/form/EditProperty";
import { formatFullDateShortTextWitHours } from "@/lib/date";

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
        const propertyDefaultValue = {
            name: name || "",
            categoryProperty,
        };
        await wait(3000);
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
