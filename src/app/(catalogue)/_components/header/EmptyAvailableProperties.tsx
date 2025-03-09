import Image from "next/image";
import React from "react";
import logo from "@assets/images/logo.png";
import background from "@assets/images/background.png";
import { cn } from "@/lib/utils";

const EmptyAvailableProperties = () => {
    const ACTIVE_BLUR = false;
    const styles: React.CSSProperties = {
        backgroundImage: `linear-gradient(to right,rgba(16,104,53,0.65),rgba(0,0,0,0.65)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    return (
        <div className="h-full w-full bg-primary shadow-xl flex flex-col justify-center items-center " style={styles}>
            <div className="w-[45vw] xl:w-fit grid place-items-center  p-8 rounded bg-gradient-to-tr from-black to-primary shadow-xl absolute z-10">
                <Image src={logo} alt="logo dynasty 8" width={500} height={500} className="object-contain" />
            </div>
            <div
                className={cn(
                    {
                        "backdrop-blur-md": ACTIVE_BLUR,
                    },
                    "absolute h-full w-full z-1",
                )}
            ></div>
        </div>
    );
};

export default EmptyAvailableProperties;
