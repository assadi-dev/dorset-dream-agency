import { Loader2 } from "lucide-react";
import React from "react";

const LoadingReleaseData = () => {
    return (
        <div className="h-[25vh] grid place-items-center">
            <div className="p-5 text-center flex flex-col justify-center items-center">
                <Loader2 className=" my-3 animate-pulse-spin" />
                <p className="motion-preset-fade">Récupération des données</p>
            </div>
        </div>
    );
};

export default LoadingReleaseData;
