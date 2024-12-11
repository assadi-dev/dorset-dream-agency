import { Component, ReactElement } from "react";

export type DashboardNavigationType = {
    title: string;
    path?: string;
    icon?: any;
    children?: DashboardNavigationType[];
};
