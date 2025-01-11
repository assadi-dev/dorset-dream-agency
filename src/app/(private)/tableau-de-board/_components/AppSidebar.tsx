"use client";
import React from "react";
import { dashboardNavigation, dashboardNavigationPatron, dashboardNavigationUser } from "./dashboardRoutes";
import NavigationItems from "./NavigationItems";
import DashboardLogo from "./DasboardLogo";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import UserConnect from "./UserConnect";
import { isAdmin } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Role, RoleEnum } from "@/app/types/user";

const getSideBar = (role: Role) => {
    switch (role) {
        case RoleEnum.admin:
            return dashboardNavigation;
        case RoleEnum.patron:
            return dashboardNavigationPatron;
        default:
            return dashboardNavigationUser;
    }
};

type AppSidebar = {
    role: Role;
};
const AppSidebar = ({ role }: AppSidebar) => {
    const SIDEBAR = getSideBar(role);
    return (
        <Sidebar className="bg-gradient-to-br  from-[#214583] from-[5%]   to-[#05095c] to-100%    text-white">
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
                            {SIDEBAR.map((item) => (
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
