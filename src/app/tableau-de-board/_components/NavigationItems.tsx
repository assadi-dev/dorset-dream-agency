"use client";
import Link from "next/link";
import React from "react";
import { DashboardNavigationType } from "./types";

export type NavigationProps = {
    route: DashboardNavigationType;
};

const NavigationItems = ({ route }: NavigationProps) => {
    return (
        <>
            {route.children ? (
                <ul>
                    {route.children?.map((parent) =>
                        parent.path ? (
                            <li key={parent.path}>
                                <Link href={parent.path}>{parent.name} </Link>{" "}
                            </li>
                        ) : null,
                    )}
                </ul>
            ) : (
                route.path && (
                    <li>
                        <Link href={route.path}>{route.name} </Link>
                    </li>
                )
            )}
        </>
    );
};

export default NavigationItems;
