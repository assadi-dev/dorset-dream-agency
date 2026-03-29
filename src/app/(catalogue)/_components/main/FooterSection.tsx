import { currentYear } from "@/lib/utils";
import React from "react";

const FooterSection = () => {

    const footerBg = "bg-gradient-to-br  from-black to-[#106835] dark:from-card dark:to-card";
    return (
        <footer className={` w-full p-3 flex flex-col justify-between ${footerBg}`}>
            <div className=" text-center w-full p-1">
                <p className="text-sm">&copy; {currentYear()} DYNASTY 8 Tous droit réservé</p>
            </div>
        </footer>
    );
};

export default FooterSection;
