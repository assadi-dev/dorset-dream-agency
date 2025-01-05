import { setTitlePage } from "@/lib/utils";

import PageTemplate from "../../_components/PageTemplate";
import EditorPanel from "../_components/EditorPanel";
import CanvasContainer from "../_components/CanvasContainer";
import ModalProvider from "@/components/Modals/ModalProvider";
import ElementsPanel from "../_components/ElementsPanel";
import FabricProvider from "../_components/fabric/FabricProvider";
import { adminAccess } from "@/lib/security";
import { findOneByID } from "@/database/drizzle/repositories/announcements";
import { datetimeFormatFr, datetimeFormatFr2 } from "@/lib/date";
import { loadAnnounceSaves } from "./helpers";

export const metadata = setTitlePage("Éditeur d' annonce");

type CreateAnnouncementPageProps = {
    searchParams: {
        id?: string;
    };
};

const CreateAnnouncementPage = async ({ searchParams: { id } }: CreateAnnouncementPageProps) => {
    await adminAccess();
    if (!id) throw new Error("id missing !");
    const announce = await findOneByID(Number(id));
    if (!announce) throw new Error("Annonce introuvable");
    const saves = announce.settings ? await loadAnnounceSaves(String(announce.settings)) : undefined;

    return (
        <ModalProvider>
            <FabricProvider>
                <PageTemplate
                    title={`Modifier l'annonce`}
                    description={`Annonce ${announce.title} crée le  ${datetimeFormatFr(String(announce.createdAt))}`}
                >
                    <div className="grid grid-cols-[auto,1fr,auto] pt-6 h-[78vh] w-full gap-3">
                        <ElementsPanel />
                        <CanvasContainer canvasObject={saves} />
                        <EditorPanel />
                    </div>
                </PageTemplate>
            </FabricProvider>
        </ModalProvider>
    );
};

export default CreateAnnouncementPage;
