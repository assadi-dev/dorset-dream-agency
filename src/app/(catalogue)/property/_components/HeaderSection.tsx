import React from "react";
import AsidePropertyDetails from "./AsidePropertyDetails";

const HeaderSection = () => {
    return (
        <header className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] gap-8 lg:items-center w-full min-h-[10vh]">
            <div className="w-full h-[280px] lg:h-[400px] bg-sky-300 p-3"></div>
            <div className="w-full lg:w-[20vw] lg:self-end flex flex-col items-center justify-center h-full">
                <AsidePropertyDetails />
            </div>
        </header>
    );
};

export default HeaderSection;
