"use client";
import React from "react";
import { getDateToday } from "../helper";
import { useInterval } from "@/hooks/useInterval";
import DashboardCard from "../DashboardCard";

type TodayDateReducerType = { day: string; hours: string; week: number };
const reducer = (prev: TodayDateReducerType, state: TodayDateReducerType) => ({ ...prev, ...state });
const TodayCards = () => {
    const [state, setState] = React.useReducer(reducer, { day: "", hours: "", week: 0 });

    const updateDate = React.useCallback(() => {
        const { day, hours, week } = getDateToday();

        setState({ day: day.toUpperCase(), hours: hours.toUpperCase(), week: week });
    }, []);

    useInterval(updateDate, 1000);
    return (
        <DashboardCard className="bg-primary text-secondary">
            <div className="text-center grid grid-rows-[auto,1fr,auto] gap-3 justify-content-center">
                <p className="font-bold">{state.day}</p>
                <p className="text-3xl font-bold">{state.hours}</p>
                <p className="font-bold">SEMAINE {state.week}</p>
            </div>
        </DashboardCard>
    );
};

export default TodayCards;
