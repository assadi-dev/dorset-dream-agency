import React from "react";
import HeaderRightDetails from "./HeaderRightDetails";
import HeaderPhotoSlides from "./HeaderPhotoSlides";

const HeaderSection = () => {
    return (
        <section className="flex flex-col xl:grid xl:grid-cols-[1fr,auto] gap-8 xl:items-center w-full min-h-[10vh]">
            <div className="w-full">
                <HeaderPhotoSlides />
            </div>
            <div className="w-full xl:w-[20vw] xl:self-end flex flex-col items-center justify-center h-full">
                <HeaderRightDetails />
            </div>
        </section>
    );
};

export default HeaderSection;
