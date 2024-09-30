import React from "react";
import DashboardCard from "./DashboardCard";
import { DollarSign, Hotel, Users } from "lucide-react";
import TodayCards from "./_cards/TodayCards";

const DashboardHeader = () => {
    return (
        <section className="grid gap-4 grid-cols-2  lg:grid-cols-4 mt-3">
            <DashboardCard title="Revenue Total" icon={DollarSign} className="bg-primary text-secondary">
                <div className="grid grid-rows-[1fr,auto] gap-3.5 justify-content-center">
                    <p className="text-4xl font-bold text-center">$0</p>
                    <p className="text-xs text-muted-foreground">+20.1% depuis le 26/08/2024</p>
                </div>
            </DashboardCard>
            <DashboardCard title="Location" icon={Hotel} className="bg-primary text-secondary">
                <div className="text-4xl font-bold text-center my-1">+0</div>
                <p className="text-xs text-muted-foreground"> 0 Location Iles</p>
                <p className="text-xs text-muted-foreground"> 0 Location lS</p>
            </DashboardCard>
            <DashboardCard title="Client totals" icon={Users} className="bg-primary text-secondary">
                <div className="grid grid-rows-[1fr,auto] gap-3.5 justify-content-center">
                    <p className="text-4xl font-bold text-center">+0</p>
                    <p className="text-xs text-muted-foreground">+8% depuis le 26/08/2024</p>
                </div>
            </DashboardCard>
            <TodayCards />
        </section>
    );
};

export default DashboardHeader;
