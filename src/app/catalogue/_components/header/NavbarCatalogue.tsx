import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ENV } from "@/config/global";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import React from "react";

const NavbarCatalogue = async () => {
    const session = await auth();

    const ConnectButton = () => {
        if (session)
            return (
                <Button asChild>
                    <Link href={PAGES.DASHBOARD}>Tableau de board</Link>
                </Button>
            );
        return (
            <Button asChild>
                <Link href={ENV.NEXT_AUTH_SIGN_IN_PAGE}>Connexion</Link>
            </Button>
        );
    };

    return (
        <nav className="w-full  min-h-10 ">
            <div className="shadow bg-secondary/50 backdrop-blur-lg transition-all grid grid-cols-[1fr,0.5fr] rounded-lg p-3 items-center">
                <div>
                    <Link href="/">
                        <strong>DORSET DREAM</strong>
                    </Link>
                </div>
                <div className="flex justify-end items-center">
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default NavbarCatalogue;
