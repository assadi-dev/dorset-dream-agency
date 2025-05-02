import React from "react";
import TodayCards from "./_cards/TodayCards";
import ClientsCard from "./_cards/ClientsCard";
import IncomeCard from "./_cards/IncomeCard";
import ResumeTransactionCard from "./_cards/ResumeTransactionCard";

const DashboardHeader = () => {
    return (
        <section className="grid gap-2 xl:gap-4 grid-cols-2  lg:grid-cols-4 mt-3">
            <IncomeCard />
            <ResumeTransactionCard />
            <ClientsCard />
            <TodayCards />
        </section>
    );
};

export default DashboardHeader;
