"use client";
import React from "react";
import styles from "../styles.module.css";
import { cn } from "@/lib/utils";
import { dashboardNavigation } from "./dashboardRoutes";
import NavigationItems from "./NavigationItems";
import DashboardLogo from "./DasboardLogo";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import UserConnect from "./UserConnect";

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="mb-5">
                <SidebarMenu className="flex justify-end items-center p-3  rounded-xl">
                    <SidebarMenuItem className="w-[45%vw]  lg:w-[60%] h-[auto]">
                        <DashboardLogo />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dashboardNavigation.map((item) => (
                                <NavigationItems key={item.title} route={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserConnect />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;
