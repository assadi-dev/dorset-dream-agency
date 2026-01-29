import ModalProvider from "@/components/Modals/ModalProvider";
import PageTemplate from "../../_components/PageTemplate";
import ReleaseCard from "./ReleaseCard";

const ReleasePage = () => {
    return (
        <ModalProvider>
            <PageTemplate title="Release" description="Generation de texte d'annonce des versions">
                <section className="my-3">
                    <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-3 items-center">
                        <div></div>
                    </div>
                </section>
                <section>
                    <ReleaseCard />
                </section>
            </PageTemplate>
        </ModalProvider>
    );
};

export default ReleasePage;
