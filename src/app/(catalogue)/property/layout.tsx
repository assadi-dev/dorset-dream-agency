import React from "react";

type PropertyLayoutType = {
    children: React.ReactElement;
};
const PropertyLayout = async ({ children }: PropertyLayoutType) => {
    return <main className="w-full p-5 sm:p-8 2xl:max-w-[1800px] mx-auto">{children}</main>;
};

export default PropertyLayout;
