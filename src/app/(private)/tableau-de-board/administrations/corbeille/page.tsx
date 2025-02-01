import { auth, UserSession } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";
import WorkInProgress from "./_components/work_in_progress";

const TrashPage = async () => {
    const session = await auth();
    const role = session?.user?.role;
    if (!isAdmin(role)) notFound();
    return (
        <PageTemplate title="Corbeille" description="Consulté le elements supprimé">
            <div>
                <WorkInProgress />
            </div>
        </PageTemplate>
    );
};

export default TrashPage;
