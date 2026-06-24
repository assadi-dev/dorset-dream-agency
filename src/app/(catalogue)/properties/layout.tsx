import React from "react";

type PropertiesLayoutProps = {
    children: React.ReactNode;
};
const PropertiesLayout = async ({ children }: PropertiesLayoutProps) => {
    return <main className="w-full p-5 sm:p-8 2xl:max-w-[1800px] mx-auto">{children}</main>;
};

export default PropertiesLayout;
