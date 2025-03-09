"use client";
import { Hotel } from "lucide-react";
import React from "react";
import DashboardCard from "../DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, getGlobalCountTransaction } from "../helper";

const ResumeTransactionCard = () => {
    const { data, isFetching, error } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION],
        queryFn: getGlobalCountTransaction,
    });

    return (
        <DashboardCard title="Locations - Ventes" icon={Hotel} className="bg-primary text-secondary">
            <div className="text-4xl font-bold text-center my-1 drop-shadow-lg">{data?.total}</div>
            <p className="text-xs text-muted drop-shadow-lg"> {data?.rental} Locations</p>
            <p className="text-xs text-muted drop-shadow-lg"> {data?.sales} Ventes</p>
        </DashboardCard>
    );
};

export default ResumeTransactionCard;
