import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import { setTitlePage } from "@/lib/utils";
import ClientDetailCard from "./_components/ClientDetailCard";
import TabsTest from "./_components/Tabs/Tabs";

type DetailClientPageType = {
    searchParams: {
        client?: string;
    };
};

export const metadata = setTitlePage("Info client");
const DetailClientPage = ({ searchParams: { client } }: DetailClientPageType) => {
    return (
        <PageTemplate>
            <div className="lg:grid lg:grid-cols-[250px,1fr] gap-5 lg:min-h-[calc(100vh-220px)] ">
                <ClientDetailCard />
                <div>
                    <TabsTest />
                </div>
            </div>
        </PageTemplate>
    );
};

export default DetailClientPage;
