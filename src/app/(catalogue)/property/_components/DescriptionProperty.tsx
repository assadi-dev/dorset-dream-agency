import React from "react";

type DescriptionPropertyProps = {
    description?: string | null;
};
const DescriptionProperty = ({ description }: DescriptionPropertyProps) => {
    return (
        <>
            <h2 className=" lg:text-2xl font-bold">Description</h2>
            <p className="text-slate-500 my-3 break-words text-sm text-justify sm:text-left">
                {description || "Aucune description"}
            </p>
        </>
    );
};

export default DescriptionProperty;
