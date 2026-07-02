import React from "react";
import { Folders } from "lucide-react";

const EmptyAnnounce = () => {
    return (
        <div className="flex  flex-col gap-2 justify-center items-center  w-full text-slate-500 p-8 h-[25vh]">
            <Folders size={24} />
            <p> Pas d'annonce </p>
        </div>
    );
};

export default EmptyAnnounce;
