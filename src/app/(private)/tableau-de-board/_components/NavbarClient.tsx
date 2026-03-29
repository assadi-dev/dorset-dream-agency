"use client";
import { Session } from "next-auth";
import React from "react";
import BreadcrumbTheme from "./BreadcrumbTheme";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import styles from "../styles.module.css";

const NavbarComponent = ({ session }: { session: Session | null }) => {
    const navbarContainerRef = React.useRef<HTMLDivElement>(null);
    const navbarContentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const updateNavbar = () => {
            if (window.scrollY > 50) {
                if (navbarContainerRef.current && navbarContentRef.current) {
                    navbarContainerRef.current.classList.remove("p-3", "rounded-full");
                    navbarContentRef.current.classList.remove("rounded-full");
                }
            } else {
                if (navbarContainerRef.current && navbarContentRef.current) {
                    navbarContainerRef.current.classList.add("p-3", "rounded-full");
                    navbarContentRef.current.classList.add("rounded-full");
                }
            }
        }
        window.addEventListener("scroll", updateNavbar);

        return () => {
            window.removeEventListener("scroll", updateNavbar);
        }
    }, [session]);
    return (
        <header
            ref={navbarContainerRef}
            className={cn(styles.dashboardHeader, "z-[10]  p-3 transition-all duration-300")}
        >
            <div ref={navbarContentRef} className={cn("bg-dynasty-card shadow flex justify-between items-center z-[10] rounded-full border  p-1 px-5 transition-all duration-300")}>
                <BreadcrumbTheme />
                <div className="flex items-center  gap-1 xl:gap-3 justify-end px-1 xl:px-5">
                    <ModeToggle variant="ghost" />
                    <SidebarTrigger />
                </div>
            </div>
        </header>
    );
}

export default NavbarComponent;
