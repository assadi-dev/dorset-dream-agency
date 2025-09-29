import React from "react";
import NavbarCatalogue from "./_components/header/NavbarCatalogue";
import FooterSection from "./_components/main/FooterSection";
import { setTitlePage } from "@/lib/utils";
import { ENV } from "@/config/global";

export const metadata = setTitlePage("Catalogue");
metadata.description = `Consulter le catalogue des biens immobilier proposer par l'agence ${ENV.APP_TITLE}`;

type CatalogueTemplateProps = {
    children: React.ReactElement;
};
const CatalogueLayout = async ({ children }: CatalogueTemplateProps) => {
    return (
        <>
            <NavbarCatalogue />

            {children}

            <FooterSection />
        </>
    );
};

export default CatalogueLayout;
