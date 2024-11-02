"use client";
import React from "react";
import { getDateToday } from "../helper";
import { TodayDateReducerType } from "./types";
import { useInterval } from "@/hooks/useInterval";

const reducer = (prev: TodayDateReducerType, state: TodayDateReducerType) => ({ ...prev, ...state });

const ClientHoursTick = ({ day, hours, week }: TodayDateReducerType) => {
    const [state, setState] = React.useReducer(reducer, { day: day, hours: hours, week: week });

    const updateDate = React.useCallback(() => {
        const { day, hours, week } = getDateToday();
        setState({ day: day.toUpperCase(), hours: hours.toUpperCase(), week: week });
    }, []);

    useInterval(updateDate, 1000);
    return (
        <div className="text-center grid grid-rows-[auto,1fr,auto] gap-3 justify-content-center">
            <p className="font-bold">{state.day}</p>
            <p className="text-3xl font-bold">{state.hours}</p>
            <p className="font-bold">SEMAINE {state.week}</p>
        </div>
    );
};

export default ClientHoursTick;
