import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import BreadcrumbTheme from "./_components/BreadcrumbTheme";
import styles from "./styles.module.css";
import Sidebar from "./_components/Sidebar";
import { cn, currentYear } from "@/lib/utils";
import DashboardNavbar from "./_components/DashboardNavbar";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";

type AdminLayoutType = {
    children: React.ReactNode;
};
const AdminLayout = async ({ children }: AdminLayoutType) => {
    const session = await auth();

    if (!session) {
        redirect("/connexion");
    }

    return (
        <AuthSessionProvider session={session}>
            <div className={styles.dashboardLayout}>
                <Sidebar />
                <DashboardNavbar />
                <main className={styles.dashboardMain}>
                    <BreadcrumbTheme />

                    {children}
                </main>
                <footer className={cn(styles.dashboardFooter, "bg-white")}>
                    <p>copyright &copy; {currentYear()} </p>
                </footer>
            </div>
        </AuthSessionProvider>
    );
};

export default AdminLayout;
