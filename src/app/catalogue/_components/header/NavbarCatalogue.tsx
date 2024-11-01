import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ENV } from "@/config/global";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import React from "react";
import logo from "@assets/images/logo-catalog.png";
import Image from "next/image";

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
        <nav className="w-full  min-h-10 mb-12">
            <div className="shadow bg-secondary/50 backdrop-blur-lg transition-all grid grid-cols-[1fr,0.5fr] rounded-lg p-3 items-center">
                <div className="h-[50px] flex items-center">
                    <Link href="/">
                        <strong>DORSET DREAM</strong>
                        {/*        <Image
                            src={logo}
                            alt="logo du site catalogue Dorset dream agency"
                            height={500}
                            width={500}
                            className="h-[50px] w-[100px] object-contain"
                        /> */}
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
