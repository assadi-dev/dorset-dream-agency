import React from "react";
import { cn } from "@/lib/utils";
import styles from "../styles.module.css";
import { auth } from "@/auth";
import AvatarDropdown from "./AvatarDropdown";

const DashboardNavbar = async () => {
    const { user } = await auth();

    return (
        <header className={cn(styles.dashboardHeader, "bg-white shadow flex justify-end items-center")}>
            <AvatarDropdown user={user} />
        </header>
    );
};

export default DashboardNavbar;
