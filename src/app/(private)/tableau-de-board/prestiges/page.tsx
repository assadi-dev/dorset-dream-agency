import React from "react";
import PageTemplate from "../_components/PageTemplate";
import ListsPrestige from "./_components/ListsPrestige";
import { setTitlePage } from "@/lib/utils";

export const metadata = setTitlePage("Prestige");

const PrestigePage = async () => {
    return (
        <PageTemplate title="Prestiges">
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center"></div>
            </section>
            <ListsPrestige />
        </PageTemplate>
    );
};

export default PrestigePage;
