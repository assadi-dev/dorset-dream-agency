import { auth } from "@/auth";
import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import { formatFullDateShortText } from "@/lib/date";
import UploadPhoto from "@/components/forms/UploadPhoto";
import ProfilTabs from "./_components/Tabs/PersonalData";
import { Session } from "./type";

export const metadata = setTitlePage("Mon compte");
const AccountPage = async () => {
    const session = await auth();
    const prevImage =
        "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <PageTemplate
            title={session?.user?.name || "S"}
            description={`Compte créer le  ${formatFullDateShortText(new Date("2024-03-10"))}`}
        >
            {/*   {<pre>{JSON.stringify(session, null, 2)}</pre>} */}
            <div className="grid sm:grid-cols-[auto,1fr] gap-3 p-3 mt-8">
                <UploadPhoto photo={prevImage} className="w-[20rem] h-[20rem]" />

                <ProfilTabs session={session as Session} />
            </div>
        </PageTemplate>
    );
};

export default AccountPage;
