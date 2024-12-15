import { auth } from "@/auth";
import { setTitlePage, wait } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import ProfilTabs from "./_components/Tabs/PersonalData";
import { currentUser } from "@/database/drizzle/repositories/users";
import LoadingTabs from "./_components/loading/LoadingTabs";
import ModalProvider from "@/components/Modals/ModalProvider";
import { UserData } from "./type";
import UploadAccountPhoto from "./_components/form/UploadAccountPhoto";

export const metadata = setTitlePage("Mon compte");
const AccountPage = async () => {
    const session = await auth();
    const id = Number(session?.user?.id);

    const prevImage = session?.user?.image || null;

    const ProfilAsync = async () => {
        const userData = await currentUser(id);
        return <ProfilTabs userData={userData as UserData} />;
    };
    return (
        <ModalProvider>
            <PageTemplate title={session?.user?.name || ""}>
                <div className="grid sm:grid-cols-[auto,1fr] gap-3 p-3 mt-8">
                    <UploadAccountPhoto className="w-[20rem] h-[20rem]" photo={prevImage} />
                    <React.Suspense fallback={<LoadingTabs />}>
                        <ProfilAsync />
                    </React.Suspense>
                </div>
            </PageTemplate>
        </ModalProvider>
    );
};

export default AccountPage;
