import React from "react";
import DashboardCard from "./DashboardCard";
import { DollarSign, Hotel, Users } from "lucide-react";
import TodayCards from "./_cards/TodayCards";
import ClientsCard from "./_cards/ClientsCard";
import IncomeCard from "./_cards/IncomeCard";

const DashboardHeader = () => {
    return (
        <section className="grid gap-4 grid-cols-2  lg:grid-cols-4 mt-3">
            <IncomeCard />
            <DashboardCard title="Location" icon={Hotel} className="bg-primary text-secondary">
                <div className="text-4xl font-bold text-center my-1">+0</div>
                <p className="text-xs text-muted-foreground"> 0 Location Iles</p>
                <p className="text-xs text-muted-foreground"> 0 Location lS</p>
            </DashboardCard>
            <ClientsCard />
            <TodayCards />
        </section>
    );
};

export default DashboardHeader;
