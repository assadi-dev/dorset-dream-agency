import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ENV } from "@/config/global";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import React from "react";
import logo from "@assets/images/logo.png";
import Image from "next/image";

const NavbarCatalogue = async () => {
    const session = await auth();
    const classButton = `bg-gradient-to-br from-black to-primary shadow-lg ring-2 ring-green-900`;

    const ConnectButton = () => {
        if (session)
            return (
                <Button asChild className={classButton}>
                    <Link href={PAGES.DASHBOARD}>Tableau de board</Link>
                </Button>
            );
        return (
            <Button asChild className={classButton}>
                <Link href={ENV.NEXT_AUTH_SIGN_IN_PAGE}>Connexion</Link>
            </Button>
        );
    };
    /*sm:px-8 2xl:max-w-[1800px] mx-auto pt-3 px-3 sm:pt-5 */
    return (
        <nav className="w-full  min-h-10 ">
            <div className="shadow-md bg-white backdrop-blur-lg transition-all grid grid-cols-[1fr,0.5fr] p-3 items-center">
                <div className="h-[50px] flex items-center">
                    <Link href="/" className="px-5 bg-primary py-3 rounded-md">
                        {/*  <strong>DORSET DREAM</strong> */}
                        <Image
                            src={logo}
                            alt="logo du site catalogue Dorset dream agency"
                            height={1200}
                            width={800}
                            className="h-auto  w-[4rem] lg:w-[5rem] "
                        />
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
