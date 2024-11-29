import React from "react";
import { setTitlePage } from "@/lib/utils";
import PageTemplate from "./_components/PageTemplate";
import DashboardHeader from "./_dashboard/DashboardHeader";
import DashboardBody from "./_dashboard/sections/DashboardBody";

export const metadata = setTitlePage("Tableau de board");
const DashboardPage = async () => {
    return (
        <PageTemplate title="Tableau de board">
            <DashboardHeader />
            {/*   <DashboardBody /> */}
        </PageTemplate>
    );
};

export default DashboardPage;
