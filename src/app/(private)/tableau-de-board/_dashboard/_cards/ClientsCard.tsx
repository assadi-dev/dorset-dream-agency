"use client";
import React from "react";
import DashboardCard from "../DashboardCard";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, getClientCount } from "../helper";
import { getNbOfDayInMonth, getStartOfWeek } from "@/lib/date";

const ClientsCard = () => {
    const currentMonth = new Date(getStartOfWeek()).toLocaleDateString("en-US", {
        month: "2-digit",
    });
    const currentDay = new Date(getStartOfWeek()).toLocaleDateString("en-US", {
        day: "2-digit",
    });
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${currentMonth}-${currentDay} 00:00`;
    const endDate = `${currentYear}-${currentMonth}-${getNbOfDayInMonth(parseInt(currentMonth), currentYear)} 23:59`;

    const showInCard = new Date(startDate).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const { data, error, isFetching } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_CLIENT, startDate, endDate],
        queryFn: () => getClientCount(startDate, endDate),
    });

    return (
        <DashboardCard title="Total Clients" icon={Users} className="bg-primary text-secondary">
            <div className="grid grid-rows-[1fr,auto] gap-3.5 justify-content-center">
                <p className="text-4xl font-bold text-center">{data?.count || 0}</p>
                <div>
                    <p className="text-xs text-muted-foreground">
                        +{data?.difference.count} depuis le {showInCard}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        +{data?.difference.percentage}% depuis le {showInCard}
                    </p>
                </div>
            </div>
        </DashboardCard>
    );
};

export default ClientsCard;
