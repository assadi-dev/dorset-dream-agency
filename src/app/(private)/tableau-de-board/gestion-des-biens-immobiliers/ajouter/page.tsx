import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import ModalProvider from "@/components/Modals/ModalProvider";
import AddProperty from "./_components/views/AddProperty";
import { setTitlePage } from "@/lib/utils";

export const metadata = setTitlePage("Création de biens immobiliers");
const AddPropertyPage = async () => {
    return (
        <PageTemplate
            title="Ajouter un bien immobilier"
            description="Ajouter un bien ainsi que les couleurs des intérieurs"
        >
            <AddProperty />
        </PageTemplate>
    );
};
export default AddPropertyPage;
