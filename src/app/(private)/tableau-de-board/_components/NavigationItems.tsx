"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DashboardNavigationType } from "./types";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export type NavigationProps = {
    route: DashboardNavigationType;
};
const SIDEBAR_STORAGE = "sidebar_toggle";

const NavigationItems = ({ route }: NavigationProps) => {
    const pathname = usePathname();
    const searchParam = useSearchParams();

    const [state, setState] = useState<{ isOpen: boolean; group: string }>({
        isOpen: false,
        group: "",
    });

    useEffect(() => {
        if (localStorage && localStorage.getItem(SIDEBAR_STORAGE)) {
            const storedSidebarState = localStorage.getItem(SIDEBAR_STORAGE) as string;
            const parse = JSON.parse(storedSidebarState) as { isOpen: boolean; group: string };
            setState({
                isOpen: parse.isOpen,
                group: parse.group,
            });
        }
    }, []);

    const isActive = (path: string) => {
        searchParam.size;

        if (searchParam.size > 0) {
            const pathArrayWithoutParams = pathname.split("/").slice(-searchParam.size);
            const lastPath = [...pathArrayWithoutParams].slice(-1);
            if (path.includes(lastPath.join("/"))) {
                return true;
            }
        }

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

    const CLASS_ITEM =
        "data-[active=true]:border data-[active=true]:border-white/25  rounded data-[active=true]:font-bold  data-[active=true]:bg-gradient-to-r  from-primary from-5% to-primary";

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
                                        <SidebarMenuSubButton
                                            asChild
                                            isActive={isActive(parent.path)}
                                            className={CLASS_ITEM}
                                        >
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
                    <SidebarMenuButton asChild isActive={isActive(route.path)} className={CLASS_ITEM}>
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
