import React from "react";
import HeaderRightDetails from "./HeaderRightDetails";
import HeaderPhotoSlides from "./HeaderPhotoSlides";

const HeaderSection = () => {
    return (
        <header className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] gap-8 lg:items-center w-full min-h-[10vh]">
            <div className="w-full">
                <HeaderPhotoSlides />
            </div>
            <div className="w-full lg:w-[20vw] lg:self-end flex flex-col items-center justify-center h-full">
                <HeaderRightDetails />
            </div>
        </header>
    );
};

export default HeaderSection;
