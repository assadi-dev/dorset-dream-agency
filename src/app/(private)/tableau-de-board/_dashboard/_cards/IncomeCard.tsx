"use client";
import { getNbOfDayInMonth, getStartOfWeek } from "@/lib/date";
import React from "react";
import DashboardCard from "../DashboardCard";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, getIncomeTransaction } from "../helper";
import formatThousand from "format-thousands";

const IncomeCard = () => {
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
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_INCOME, startDate, endDate],
        queryFn: () => getIncomeTransaction(startDate, endDate),
    });

    return (
        <DashboardCard title="Revenu Total" icon={DollarSign} className="bg-primary text-secondary">
            <div className="grid grid-rows-[1fr,auto] gap-3.5 justify-content-center">
                <p className="text-4xl font-bold text-center drop-shadow-lg text-primary-accent">
                    {formatThousand(data?.sum)}$
                </p>

                <div className="text-primary-accent">
                    <p
                        className="text-xs  drop-shadow-lg
                mb-0"
                    >
                        +{formatThousand(data?.difference.sum)}$ depuis le {showInCard}{" "}
                    </p>
                    <p className="text-xs  drop-shadow-lg">
                        +{data?.difference.percentage}% depuis le {showInCard}
                    </p>
                </div>
            </div>
        </DashboardCard>
    );
};

export default IncomeCard;
