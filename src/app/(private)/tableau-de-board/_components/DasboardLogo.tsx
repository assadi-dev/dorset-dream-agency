import { ENV } from "@/config/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@assets/images/logo.jpg";

const DashboardLogo = () => {
    return (
        <Link href={ENV.NEXT_AUTH_SIGN_IN_SUCCESS}>
            <Image
                className="rounded-xl border border-white/20  w-100 h-auto shadow-inner shadow-[#020817]"
                src={logo}
                alt={`logo of ${ENV.APP_TITLE}`}
            />
        </Link>
    );
};

export default DashboardLogo;
