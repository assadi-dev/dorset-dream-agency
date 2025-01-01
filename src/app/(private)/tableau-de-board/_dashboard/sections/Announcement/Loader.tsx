import SpinnerLoading from "@/components/loader/SpinerLoading";
import React from "react";

const Loader = () => {
    return (
        <div className="grid place-items-center w-full h-full ">
            <div className="grid gap-3 place-items-center">
                <SpinnerLoading />
                <p className="animate-pulse">Récupération des donnes en cours...</p>
            </div>
        </div>
    );
};

export default Loader;
