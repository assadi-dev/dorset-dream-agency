import { Card } from "@/components/ui/card";
import React from "react";
import DashboardCard from "./DashboardCard";
import { DollarSign, Hotel, Users } from "lucide-react";

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
            <DashboardCard className="bg-primary text-secondary">
                <div className="text-center grid grid-rows-[auto,1fr,auto] gap-3 justify-content-center">
                    <p className="font-bold">SAM 27 JANV 2024</p>
                    <p className="text-3xl font-bold">15:15</p>
                    <p className="font-bold">Semaine 10</p>
                </div>
            </DashboardCard>
        </section>
    );
};

export default DashboardHeader;
