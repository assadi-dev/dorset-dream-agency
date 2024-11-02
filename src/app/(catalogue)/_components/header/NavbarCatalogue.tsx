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
        <nav className="w-full  min-h-10 sm:px-8 2xl:max-w-[1800px] mx-auto pt-3 px-3 sm:pt-5  ">
            <div className="shadow bg-white backdrop-blur-lg transition-all grid grid-cols-[1fr,0.5fr] rounded-lg p-3 items-center">
                <div className="h-[50px] flex items-center">
                    <Button asChild variant="ghost" type="button">
                        <Link href="/">
                            {/*  <strong>DORSET DREAM</strong> */}
                            <Image
                                src={logo}
                                alt="logo du site catalogue Dorset dream agency"
                                height={1200}
                                width={800}
                                className="h-auto  w-[12rem] lg:w-[180px] "
                            />
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-end items-center">
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default NavbarCatalogue;
