import ModalProvider from "@/components/Modals/ModalProvider";
import PageTemplate from "../../_components/PageTemplate";
import GestionCategoriesRightAction from "./_components/GestionCategoriesRightAction";

export default function GestionDesCategories() {
    return (
        <ModalProvider>
            <PageTemplate title="Categories" description="Gestion des categories des biens immobiliers">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center">
                        <div></div>
                        <GestionCategoriesRightAction />
                    </div>


                </section>
            </PageTemplate>
        </ModalProvider>
    );
}