import React from "react";
import PageTemplate from "../../_components/PageTemplate";
import { setTitlePage } from "@/lib/utils";

type DetailClientPageType = {
    params: {
        slug: string;
    };
};

export const metadata = setTitlePage("Info client");
const DetailClientPage = ({ params: { slug } }: DetailClientPageType) => {
    return (
        <PageTemplate>
            <div>
                <h1>Detail Client Page {slug}</h1>
            </div>
        </PageTemplate>
    );
};

export default DetailClientPage;
