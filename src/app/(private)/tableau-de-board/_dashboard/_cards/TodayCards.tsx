"use client";
import React from "react";
import { getDateToday } from "../helper";
import DashboardCard from "../DashboardCard";

import ClientHoursTick from "./ClientClock";

const TodayCards = () => {
    const { day, hours, week } = getDateToday();
    return (
        <DashboardCard className="bg-primary text-secondary">
            <ClientHoursTick day={day.toUpperCase()} hours={hours.toUpperCase()} week={week} />
        </DashboardCard>
    );
};

export default TodayCards;
