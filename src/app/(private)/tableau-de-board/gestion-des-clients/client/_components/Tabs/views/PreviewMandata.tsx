import React from "react";

type PreviewMandatProps = {
    name: string;
    file: File;
};
const PreviewMandata = ({ name, file }: PreviewMandatProps) => {
    return (
        <div className="rounded-lg h-[160px] w-full overflow-hidden bg-red-500 flex items-center">
            <p>{name}</p>
        </div>
    );
};

export default PreviewMandata;
