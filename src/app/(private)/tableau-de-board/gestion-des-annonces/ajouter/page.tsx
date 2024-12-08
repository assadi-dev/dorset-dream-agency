import { setTitlePage } from "@/lib/utils";

import PageTemplate from "../../_components/PageTemplate";
import EditorPanel from "../_components/EditorPanel";
import CanvasContainer from "../_components/CanvasContainer";
import ModalProvider from "@/components/Modals/ModalProvider";
import ElementsPanel from "../_components/ElementsPanel";

export const metadata = setTitlePage("Gestion des annonces");
const CreateAnnouncementPage = async () => {
    return (
        <ModalProvider>
            <PageTemplate title="Création de l'annonce">
                <div className="grid grid-cols-[auto,1fr,auto] pt-6 h-[78vh] w-full gap-3">
                    <ElementsPanel />
                    <CanvasContainer />
                    <EditorPanel />
                </div>
            </PageTemplate>
        </ModalProvider>
    );
};

export default CreateAnnouncementPage;
