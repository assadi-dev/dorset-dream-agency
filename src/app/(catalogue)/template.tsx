import React from "react";
import NavbarCatalogue from "../catalogue/_components/header/NavbarCatalogue";
import FooterSection from "../catalogue/_components/main/FooterSection";

type CatalogueTemplateProps = {
    children: React.ReactElement;
};
const CatalogueTemplate = async ({ children }: CatalogueTemplateProps) => {
    return (
        <>
            <NavbarCatalogue />

            <main className="w-full p-5 sm:p-8 2xl:max-w-[1800px] mx-auto">{children}</main>

            <FooterSection />
        </>
    );
};

export default CatalogueTemplate;
