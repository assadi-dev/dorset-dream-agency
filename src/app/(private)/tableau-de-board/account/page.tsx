import { auth } from "@/auth";
import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import { formatFullDateShortText } from "@/lib/date";
import UploadPhoto from "@/components/forms/UploadPhoto";
import ProfilTabs from "./_components/Tabs/PersonalData";
import { Session } from "./type";
import { currentUser } from "@/database/drizzle/repositories/users";
import LoadingTabs from "./_components/loading/LoadingTabs";

export const metadata = setTitlePage("Mon compte");
const AccountPage = async () => {
    const session = await auth();
    const id = Number(session?.user?.id);
    const prevImage =
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const ProfilAsync = async () => {
        await wait(3000);
        const userData = await currentUser(id);
        return <ProfilTabs userData={userData} />;
    };
    return (
        <PageTemplate title={session?.user?.name || ""}>
            {/*   {<pre>{JSON.stringify(session, null, 2)}</pre>} */}
            <div className="grid sm:grid-cols-[auto,1fr] gap-3 p-3 mt-8">
                <UploadPhoto photo={prevImage} className="w-[20rem] h-[20rem]" />
                <React.Suspense fallback={<LoadingTabs />}>
                    <ProfilAsync />
                </React.Suspense>
            </div>
        </PageTemplate>
    );
};

export default AccountPage;
