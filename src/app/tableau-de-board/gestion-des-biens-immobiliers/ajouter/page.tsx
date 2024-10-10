import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import ModalProvider from "@/components/Modals/ModalProvider";
import AddProperty from "./_components/form/AddProperty";

const Ajouter = async () => {
    return (
        <ModalProvider>
            <PageTemplate
                title="Ajouter un bien immobilier"
                description="Ajouter un bien ainsi que les couleurs des intérieurs"
            >
                <AddProperty />
            </PageTemplate>
        </ModalProvider>
    );
};
export default Ajouter;
