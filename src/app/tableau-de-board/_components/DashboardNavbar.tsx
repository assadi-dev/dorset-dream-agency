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
                    <AvatarDropdown user={session.user} />
                </header>
            )}
        </>
    );
};

export default DashboardNavbar;
