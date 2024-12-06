import { setTitlePage } from "@/lib/utils";

import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import PageTemplate from "../../_components/PageTemplate";
import LayerPanel from "../_components/LayerPanel";
import EditorPanel from "../_components/EditorPanel";
import CanvasContainer from "../_components/CanvasContainer";

export const metadata = setTitlePage("Gestion des annonces");

export const CreateAnnouncementPage = async () => {
    return (
        <PageTemplate title="Création de l'annonce">
            <div className="grid grid-cols-[auto,1fr,auto] pt-6 h-[78vh] w-full gap-3">
                <LayerPanel />
                <CanvasContainer />
                <EditorPanel />
            </div>
        </PageTemplate>
    );
};

export default CreateAnnouncementPage;
