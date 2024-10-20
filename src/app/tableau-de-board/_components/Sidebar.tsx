import React from "react";
import styles from "../styles.module.css";
import { cn } from "@/lib/utils";
import { dashboardNavigation } from "./dashboardRoutes";
import NavigationItems from "./NavigationItems";
import DashboardLogo from "./DasboardLogo";

const Sidebar = async () => {
    return (
        <aside className={cn(styles.dashboardSidebar, "bg-primary text-secondary text-pretty")}>
            <DashboardLogo />
            <ul className="py-6 px-2 ">
                {dashboardNavigation.map((item) => (
                    <NavigationItems key={item.name} route={item} />
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
