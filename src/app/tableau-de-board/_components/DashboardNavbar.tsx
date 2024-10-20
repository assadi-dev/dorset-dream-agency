import React from "react";
import { cn } from "@/lib/utils";
import styles from "../styles.module.css";
import { auth } from "@/auth";
import AvatarDropdown from "./AvatarDropdown";

const DashboardNavbar = async () => {
    const session = await auth();

    return (
        <>
            {session && (
                <header className={cn(styles.dashboardHeader, "bg-white shadow flex justify-end items-center")}>
                    {session.user && <AvatarDropdown user={session.user || null} />}
                </header>
            )}
        </>
    );
};

export default DashboardNavbar;
