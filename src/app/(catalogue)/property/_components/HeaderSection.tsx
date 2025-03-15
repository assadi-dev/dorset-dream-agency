import React from "react";
import HeaderRightDetails from "./HeaderRightDetails";
import HeaderPhotoSlides from "./HeaderPhotoSlides";
import { extractDataForInfo } from "../../schema";

type HeaderSectionProps = {
    property: {
        name: any;

        gallery: any;
    };
};
const HeaderSection = async ({ property }: HeaderSectionProps) => {
    const propertyInfo = extractDataForInfo.propertyInfo(property);
    <HeaderRightDetails propertyInfo={propertyInfo} />;

    return (
        <section className="flex flex-col xl:grid xl:grid-cols-[auto,1fr] gap-8 xl:items-center w-full min-h-[10vh]">
            <div className="w-full xl:w-[55vw]">
                {<HeaderPhotoSlides propertyName={property.name} gallery={property.gallery} />}
            </div>
            <div className="w-full  xl:self-end flex flex-col items-center justify-center h-full">
                <HeaderRightDetails propertyInfo={propertyInfo} />
            </div>
        </section>
    );
};

export default HeaderSection;
