import { auth, UserSession } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";

const TrashPage = async () => {
    const session = await auth();
    const role = session?.user?.role;
    if (!isAdmin(role)) notFound();
    return (
        <PageTemplate title="Corbeille" description="Consulté le elements supprimé">
            <div>
                <h1>Corbeille</h1>
            </div>
        </PageTemplate>
    );
};

export default TrashPage;
