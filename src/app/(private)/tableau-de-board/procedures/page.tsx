import { Button } from "@/components/ui/button";
import PageTemplate from "../_components/PageTemplate";

export const dynamic = "force-dynamic";

export const ProceduresPage = () => {
    return (
        <PageTemplate title="Procédures">

            <div className="h-[82vh] w-full sm:w-[65vw] border rounded-xl mt-5 p-3 bg-black mx-auto">
                <iframe
                    src={process.env.NEXT_PUBLIC_PROCEDURES_URL}
                    title="Procédures"
                    className="h-full w-full rounded-lg border-0"
                />
            </div>
        </PageTemplate>
    );
};

export default ProceduresPage;