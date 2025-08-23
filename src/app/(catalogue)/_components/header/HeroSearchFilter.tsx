import SearchInput from "@/components/forms/SearchInput";
import { Button } from "@/components/ui/button";
import React from "react";

const HeroSearchFilter = () => {
    return (
        <div className="bg-white w-full lg:w-3/5 mx-auto p-3 lg:p-6 flex justify-center gap-2 items-center rounded-lg lg:min-h-20 lg:translate-y-[-100%] z-10 relative shadow-md">
            <div className="flex-1">
                <p htmlFor="search-input" className="font-bold mb-2 text-slate-500">
                    Rechercher une propriété
                </p>
                <SearchInput name="search-input" className="!w-full flex-1" />
            </div>

            <Button className="w-full lg:w-fit px-5">Rechercher</Button>
        </div>
    );
};

export default HeroSearchFilter;
