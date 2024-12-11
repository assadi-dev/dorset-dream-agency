import React from "react";
import { cn } from "@/lib/utils";
import styles from "../styles.module.css";
import { auth } from "@/auth";
import AvatarDropdown from "./AvatarDropdown";
import BreadcrumbTheme from "./BreadcrumbTheme";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardNavbar = async () => {
    const session = await auth();

    return (
        <>
            {session && (
                <header
                    className={cn(styles.dashboardHeader, "bg-white shadow flex justify-between items-center z-[10]")}
                >
                    <BreadcrumbTheme />
                    {session.user && <AvatarDropdown user={session.user || null} />}
                    <SidebarTrigger />
                </header>
            )}
        </>
    );
};

export default DashboardNavbar;
