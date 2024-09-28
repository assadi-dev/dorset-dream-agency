import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "@/auth";
import styles from "../styles.module.css";
import { cn } from "@/lib/utils";
import { dashboardNavigation } from "./dashboardRoutes";
import NavigationItems from "./NavigationItems";
import DashboardLogo from "./DasboardLogo";

const Sidebar = async () => {
    const signOutBtn = async () => {
        "use server";
        await signOut();
    };

    return (
        <aside className={cn(styles.dashboardSidebar, "bg-primary text-secondary text-pretty")}>
            <DashboardLogo />
            <ul className="py-6 px-2 ">
                {dashboardNavigation.map((item) => (
                    <NavigationItems key={item.name} route={item} />
                ))}
            </ul>
            <form action={signOutBtn} className="text-center">
                <Button variant="destructive">Déconnexion</Button>
            </form>
        </aside>
    );
};

export default Sidebar;
