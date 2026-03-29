import React from "react";
import { auth } from "@/auth";
import NavbarComponent from "./NavbarClient";

const DashboardNavbar = async () => {
    const session = await auth();


    return (
        <>
            {session && (
                <NavbarComponent session={session} />
            )}
        </>
    );
};

export default DashboardNavbar;


