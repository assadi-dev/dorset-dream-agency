"use client";
import Link from "next/link";
import React from "react";
import { DashboardNavigationType } from "./types";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export type NavigationProps = {
    route: DashboardNavigationType;
};

const NavigationItems = ({ route }: NavigationProps) => {
    return (
        <>
            {route.children ? (
                <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {route.icon && <route.icon />}
                                <span>{route.title}</span>
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className=" bg-white/25 rounded border-1 ml-0   lg:ml-3.5">
                            {route.children?.map((parent) =>
                                parent.path ? (
                                    <SidebarMenuSubItem key={parent.path}>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={parent.path}>{parent.title} </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ) : null,
                            )}
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            ) : route.path ? (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={route.path}>
                            {route.icon && <route.icon />}
                            <span>{route.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ) : null}
        </>
    );
};

export default NavigationItems;
