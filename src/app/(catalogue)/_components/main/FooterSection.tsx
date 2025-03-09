import { currentYear } from "@/lib/utils";
import React from "react";

const FooterSection = () => {
    return (
        <footer className="rounded-t-3xl w-full p-3 flex flex-col justify-between text-white bg-gradient-to-br  from-black to-[#106835]">
            <div className=" text-center w-full p-1">
                <p className="text-sm">DYNASTY 8&copy; {currentYear()}</p>
            </div>
        </footer>
    );
};

export default FooterSection;
