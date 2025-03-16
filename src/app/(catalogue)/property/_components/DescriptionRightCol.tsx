import React from "react";
import HeaderRightDetails from "./HeaderRightDetails";
import { extractDataForInfo } from "../../schema";
import PropertyLightGallery from "./PropertyLightGallery";

type DescriptionRightColProp = {
    property: any;
};
const DescriptionRightCol = ({ property }: DescriptionRightColProp) => {
    const propertyInfo = extractDataForInfo.propertyInfo(property);

    return (
        <div className="flex flex-col gap-5 min-h-screen">
            <HeaderRightDetails propertyInfo={propertyInfo} />
            {property && <PropertyLightGallery property={property} />}
        </div>
    );
};

export default DescriptionRightCol;
