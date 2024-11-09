import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import EditProperty from "../ajouter/_components/form/EditProperty";

type Params = {
    searchParams: {
        property?: string;
        name?: string;
    };
};
export const metadata = setTitlePage("Edition d'un biens immobiliers");
const EditPropertyPage = async ({ searchParams }: Params) => {
    const { property, name } = searchParams;

    const EditPropertyAsync = async () => {
        const propertyDefaultValue = {
            name: name || "",
        };
        await wait(3000);
        return <EditProperty defaultValues={propertyDefaultValue} />;
    };

    return (
        <PageTemplate title={`Modifier un bien immobilier`} description={`Modifier le bien immobilier ${name}`}>
            <React.Suspense>
                <EditPropertyAsync />
            </React.Suspense>
        </PageTemplate>
    );
};

export default EditPropertyPage;
