import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import { setTitlePage } from "@/lib/utils";
import ClientDetailCard from "./_components/ClientDetailCard";
import TabsTest from "./_components/Tabs/Tabs";
import { getClientDetails } from "./actions/actions";
import { LoaderCardContainer } from "./_components/loaders/LoaderCards";

type DetailClientPageType = {
    searchParams: {
        id?: string;
    };
};

export const metadata = setTitlePage("Info client");
const DetailClientPage = async ({ searchParams: { id } }: DetailClientPageType) => {
    const ClientDetailCardAsync = async () => {
        const client = id ? await getClientDetails(id) : {};
        return <ClientDetailCard client={client} />;
    };

    return (
        <PageTemplate>
            <div className="lg:grid lg:grid-cols-[250px,1fr] gap-5 lg:min-h-[calc(100vh-220px)] ">
                <ClientDetailCardAsync />

                <div>
                    <TabsTest />
                </div>
            </div>
        </PageTemplate>
    );
};

export default DetailClientPage;
