import { auth } from "@/auth";
import { setTitlePage } from "@/lib/utils";
import React from "react";
import PageTemplate from "../_components/PageTemplate";
import { formatFullDateShortText } from "@/lib/date";

export const metadata = setTitlePage("Mon compte");
const AccountPage = async () => {
    const session = await auth();

    return (
        <PageTemplate
            title={session?.user?.name || "S"}
            description={`Compte créer le  ${formatFullDateShortText(new Date("2024-03-10"))}`}
        >
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </PageTemplate>
    );
};

export default AccountPage;
