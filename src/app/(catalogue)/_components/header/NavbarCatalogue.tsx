import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ENV } from "@/config/global";
import { PAGES } from "@/config/pages";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import logo from "@assets/images/logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const NavbarCatalogue = async () => {
    const session = await auth();
    const classButton = `bg-primary   rounded-full flex gap-2`;

    const ConnectButton = () => {
        if (session)
            return (
                <Button asChild className={classButton}>
                    <Link href={PAGES.DASHBOARD}>
                        <Globe /> Tableau de board
                    </Link>
                </Button>
            );
        return (
            <Button asChild className={classButton}>
                <Link href={ENV.NEXT_AUTH_SIGN_IN_PAGE}>
                    <Globe /> Connexion
                </Link>
            </Button>
        );
    };
    /*sm:px-8 2xl:max-w-[1800px] mx-auto pt-3 px-3 sm:pt-5 */
    return (
        <nav className="w-full  min-h-10 ">
            <div className=" backdrop-blur-lg transition-all grid grid-cols-[.5fr,1fr,.5fr] p-5 items-center">
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
                <div className="justify-self-center self-center"></div>
                <div className="flex justify-end items-center justify-self-end self-center">
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default NavbarCatalogue;
