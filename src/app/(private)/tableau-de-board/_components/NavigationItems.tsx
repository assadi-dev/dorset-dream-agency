"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";

export type NavigationProps = {
    route: DashboardNavigationType;
};
const SIDEBAR_STORAGE = "sidebar_toggle";

const NavigationItems = ({ route }: NavigationProps) => {
    const pathname = usePathname();
    const storedSidebarState = localStorage.getItem(SIDEBAR_STORAGE);
    const [state, setState] = useState<{ isOpen: boolean; group: string }>({
        isOpen: storedSidebarState ? JSON.parse(storedSidebarState).isOpen : false,
        group: storedSidebarState ? JSON.parse(storedSidebarState).group : "",
    });

    const isActive = (path: string) => {
        if (pathname === path) {
            return true;
        }
        return false;
    };

    const childrenActive = (title: string) => {
        localStorage.setItem(SIDEBAR_STORAGE, JSON.stringify({ group: title, isOpen: !state.isOpen }));
        setState((current) => {
            return { ...current, group: title, isOpen: !current.isOpen };
        });
    };

    return (
        <>
            {route.children ? (
                <Collapsible className="group/collapsible" open={state.group == route.title && state.isOpen}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild onClick={() => childrenActive(route.title)}>
                            <SidebarMenuButton>
                                {route.icon && <route.icon />}
                                <span>{route.title}</span>
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className=" border-l border-white/25  ml-3.5">
                            {route.children?.map((parent) =>
                                parent.path ? (
                                    <SidebarMenuSubItem key={parent.path}>
                                        <SidebarMenuSubButton asChild isActive={isActive(parent.path)}>
                                            <a href={parent.path}>
                                                <span>{parent.title}</span>{" "}
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ) : null,
                            )}
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            ) : route.path ? (
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive(route.path)}>
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
