import { CircleAlert } from "lucide-react";
import React from "react";

const AvertissementHeader = () => {
    return (
        <div className="my-3 ">
            <p className="lg:text-sm font-semibold flex items-center gap-2 justify-center">
                <CircleAlert size={18} /> Avertissement
            </p>
        </div>
    );
};

export default AvertissementHeader;
