import { auth } from "@/auth";
import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import { formatFullDateShortText } from "@/lib/date";
import ProfilTabs from "./_components/Tabs/PersonalData";
import { currentUser } from "@/database/drizzle/repositories/users";
import LoadingTabs from "./_components/loading/LoadingTabs";
import ModalProvider from "@/components/Modals/ModalProvider";
import UploadPhoto from "@/components/forms/UploadPhoto";

export const metadata = setTitlePage("Mon compte");
const AccountPage = async () => {
    const session = await auth();
    const id = Number(session?.user?.id);
    let description = "";
    const prevImage = session?.user?.image || null;

    const ProfilAsync = async () => {
        await wait(3000);
        const userData = await currentUser(id);
        if (userData.createdAt)
            description = `Compte créer le  ${formatFullDateShortText(new Date(userData.createdAt?.toISOString()))}`;

        return <ProfilTabs userData={userData} />;
    };
    return (
        <ModalProvider>
            <PageTemplate title={session?.user?.name || ""} description={description}>
                <div className="grid sm:grid-cols-[auto,1fr] gap-3 p-3 mt-8">
                    <UploadPhoto className="w-[20rem] h-[20rem]" photo={prevImage} />
                    <React.Suspense fallback={<LoadingTabs />}>
                        <ProfilAsync />
                    </React.Suspense>
                </div>
            </PageTemplate>
        </ModalProvider>
    );
};

export default AccountPage;
