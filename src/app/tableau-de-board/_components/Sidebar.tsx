import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "@/auth";
import styles from "../styles.module.css";
import { cn } from "@/lib/utils";
import { dashboardNavigation } from "./dashboardRoutes";
import NavigationItems from "./NavigationItems";

const Sidebar = async () => {
    const signOutBtn = async () => {
        "use server";
        await signOut();
    };

    return (
        <aside className={cn(styles.dashboardSidebar, "bg-primary text-secondary text-pretty")}>
            <ul>
                {dashboardNavigation.map((item) => (
                    <li key={item.path} className="">
                        <NavigationItems route={item} />
                    </li>
                ))}
            </ul>
            <form action={signOutBtn}>
                <Button variant="destructive">Déconnexion</Button>
            </form>
        </aside>
    );
};

export default Sidebar;
