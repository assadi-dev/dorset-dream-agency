import { ENV } from "@/config/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@assets/images/logo.png";

const DashboardLogo = () => {
    return (
        <Link href={"/tableau-de-board" /*ENV.NEXT_AUTH_SIGN_IN_SUCCESS*/}>
            <Image
                className="rounded-xl border border-white/20  w-100 h-auto shadow-inner shadow-[#020817] p-5 bg-gradient-to-br from-primary to-black"
                src={logo}
                alt={`logo of ${ENV.APP_TITLE}`}
                width={500}
                height={500}
            />
        </Link>
    );
};

export default DashboardLogo;
