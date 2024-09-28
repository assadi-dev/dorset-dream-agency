import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import BreadcrumbTheme from "./_components/BreadcrumbTheme";
import styles from "./styles.module.css";
import Sidebar from "./_components/Sidebar";
import { cn, currentYear } from "@/lib/utils";

const AdminLayout = async ({ children }) => {
    const session = await auth();

    if (!session) {
        redirect("/connexion");
    }

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />
            <header className={cn(styles.dashboardHeader, "bg-white shadow")}></header>
            <main className={styles.dashboardMain}>
                <h1>Admin</h1>
                <BreadcrumbTheme />
                <div>
                    <p>{session.user?.name}</p>
                </div>

                {children}
            </main>
            <footer className={styles.dashboardFooter}>
                <p>copyright &copy; {currentYear()} </p>
            </footer>
        </div>
    );
};

export default AdminLayout;
