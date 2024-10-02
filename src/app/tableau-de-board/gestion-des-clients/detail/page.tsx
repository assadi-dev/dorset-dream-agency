import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import { setTitlePage } from "@/lib/utils";
import ClientDetailCard from "./_components/ClientDetailCard";

type DetailClientPageType = {
    searchParams: {
        client?: string;
    };
};

export const metadata = setTitlePage("Info client");
const DetailClientPage = ({ searchParams: { client } }: DetailClientPageType) => {
    return (
        <PageTemplate>
            <div className="lg:grid lg:grid-cols-[0.25fr,1fr] gap-5 lg:min-h-[calc(100vh-200px)] ">
                <ClientDetailCard />
                <div></div>
            </div>
        </PageTemplate>
    );
};

export default DetailClientPage;
