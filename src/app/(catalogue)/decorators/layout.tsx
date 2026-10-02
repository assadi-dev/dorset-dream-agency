import ModalProvider from "@/components/Modals/ModalProvider";
import React from "react";

type DecoratorLayoutType = {
    children: React.ReactNode;
};
const DecoratorLayout = async ({ children }: DecoratorLayoutType) => {
    return <main className="w-full p-5 sm:p-8 2xl:max-w-[1800px] mx-auto">
        <ModalProvider>
            {children}
        </ModalProvider>
    </main>;
};

export default DecoratorLayout;
