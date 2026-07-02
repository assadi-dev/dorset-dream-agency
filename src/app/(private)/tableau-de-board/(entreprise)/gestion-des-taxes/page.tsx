import ModalProvider from "@/components/Modals/ModalProvider";
import PageTemplate from "../../_components/PageTemplate";
import GestionTaxesRightAction from "./_components/GestionTaxesRightAction";
import { setTitlePage } from "@/lib/utils";


import TaxesCollection from "./TaxesCollections";


export const metadata = setTitlePage("Gestion des taxes");


export default async function GestionDesTaxes() {


    return (
        <ModalProvider>
            <PageTemplate title="Taxes" description="Gestion des taxes">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                        <GestionTaxesRightAction />
                    </div>

                    <TaxesCollection />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
}