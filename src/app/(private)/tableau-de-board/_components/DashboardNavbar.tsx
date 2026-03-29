import React from "react";
import { auth } from "@/auth";
import NavbarContents from "./NavbarContents";

const DashboardNavbar = async () => {
    const session = await auth();


    return (
        <>
            {session && (
                <NavbarContents session={session} />
            )}
        </>
    );
};

export default DashboardNavbar;


