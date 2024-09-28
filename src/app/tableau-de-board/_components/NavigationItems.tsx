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
            {route.children
                ? route.children?.map((parent) =>
                      parent.path ? (
                          <li key={route.path}>
                              <Link href={parent.path}>{parent.name} </Link>{" "}
                          </li>
                      ) : null,
                  )
                : route.path && (
                      <li key={route.path}>
                          <Link href={route.path}>{route.name} </Link>
                      </li>
                  )}
        </>
    );
};

export default NavigationItems;
