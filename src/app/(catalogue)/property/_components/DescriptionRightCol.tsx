import React from "react";
import HeaderRightDetails from "./HeaderRightDetails";
import { extractDataForInfo } from "../../schema";

type DescriptionRightColProp = {
    property: any;
};
const DescriptionRightCol = ({ property }: DescriptionRightColProp) => {
    const propertyInfo = extractDataForInfo.propertyInfo(property);

    return (
        <div className="flex flex-col gap-5 min-h-screen">
            <HeaderRightDetails propertyInfo={propertyInfo} />
        </div>
    );
};

export default DescriptionRightCol;
