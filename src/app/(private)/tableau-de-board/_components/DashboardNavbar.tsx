import React from "react";
import { cn } from "@/lib/utils";
import styles from "../styles.module.css";
import { auth } from "@/auth";
import BreadcrumbTheme from "./BreadcrumbTheme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const DashboardNavbar = async () => {
    const session = await auth();

    return (
        <>
            {session && (
                <header
                    className={cn(styles.dashboardHeader, "p-3")}
                >
                    <div className={cn("bg-dynasty-card shadow flex justify-between items-center z-[10] rounded-full border  p-1 px-5")}>
                        <BreadcrumbTheme />
                        <div className="flex items-center gap-3 justify-end px-5">
                            <ModeToggle variant="ghost" />
                            <SidebarTrigger />
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default DashboardNavbar;
