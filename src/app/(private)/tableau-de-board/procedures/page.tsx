import { Button } from "@/components/ui/button";
import PageTemplate from "../_components/PageTemplate";
import { OpenNewTabButton } from "./_components/OpenNewTab";

export const dynamic = "force-dynamic";

export const ProceduresPage = () => {
    return (
        <PageTemplate title="Procédures">

            <div className="relative h-[75dvh] sm:h-[82vh] sm:w-[65vw] w-full border rounded-xl mt-5 p-1 sm:p-3 bg-black mx-auto overflow-auto [-webkit-overflow-scrolling:touch]">
                <iframe
                    src={process.env.NEXT_PUBLIC_PROCEDURES_URL}
                    title="Procédures"
                    scrolling="yes"
                    className="h-full w-full rounded-lg border-0 block [touch-action:pan-x_pan-y]"
                />
                <OpenNewTabButton href={process.env.NEXT_PUBLIC_PROCEDURES_URL} label="Ouvrir dans un nouvel onglet" />

            </div>
        </PageTemplate>
    );
};

export default ProceduresPage;