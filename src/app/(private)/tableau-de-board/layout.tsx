import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import BreadcrumbTheme from "./_components/BreadcrumbTheme";
import styles from "./styles.module.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import AppSidebar from "./_components/AppSidebar";
import { Session } from "./account/type";
import { cn } from "@/lib/utils";

type AdminLayoutType = {
    children: React.ReactNode;
};
const AdminLayout = async ({ children }: AdminLayoutType) => {
    const session = (await auth()) as Session;

    if (!session) {
        redirect("/connexion");
    }

    return (
        <AuthSessionProvider session={session}>
            <SidebarProvider>
                <AppSidebar role={session?.user?.role} />
                <main className="w-full sm:p-1">
                    <DashboardNavbar />
                    <div className={cn(styles.dashboardMain, "px-5 sm:px-1")}>{children}</div>
                </main>

                {/*
                    <footer className={cn(styles.dashboardFooter, "bg-white")}>
                        <p>copyright &copy; {currentYear()} </p>
                    </footer> 
                */}
            </SidebarProvider>
        </AuthSessionProvider>
    );
};

export default AdminLayout;
