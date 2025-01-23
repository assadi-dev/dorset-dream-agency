import { auth, UserSession } from "@/auth";
import PageTemplate from "../../_components/PageTemplate";
import { isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";

const StoryActionPage = async () => {
    const session = await auth();
    const role = session?.user?.role;
    if (!isAdmin(role)) notFound();
    return (
        <PageTemplate title="Comptes" description="Gestion des comptes employées">
            <div>
                <h1>Story Action Page</h1>
            </div>
        </PageTemplate>
    );
};

export default StoryActionPage;
