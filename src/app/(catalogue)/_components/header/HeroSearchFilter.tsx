import SearchInput from "@/components/forms/SearchInput";
import { Button } from "@/components/ui/button";
import React from "react";

const HeroSearchFilter = () => {
    return (
        <div className="bg-white w-full lg:w-4/5 mx-auto p-3 lg:p-6 flex flex-col lg:flex-row  justify-center gap-3 items-center rounded-lg lg:min-h-20 lg:translate-y-[-100%] z-10 relative shadow-md">
            <div className="w-full">
                <label htmlFor="search-input">
                    <p className="font-bold mb-2 text-slate-500"> Rechercher une propriété</p>
                </label>
                <SearchInput name="search-input" classNames={{ inputWrapper: "max-w-full " }} />
            </div>
            <div className="flex w-full gap-3">
                <div className="w-full">
                    <label htmlFor="search-input">
                        <p className="font-bold mb-2 text-slate-500"> Catégorie</p>
                    </label>
                    <SearchInput name="search-input" classNames={{ inputWrapper: "max-w-full " }} />
                </div>
                <div className="w-full">
                    <label htmlFor="search-input">
                        <p className="font-bold mb-2 text-slate-500"> Type</p>
                    </label>
                    <SearchInput name="search-input" classNames={{ inputWrapper: "max-w-full " }} />
                </div>
            </div>

            <Button className="w-full lg:w-fit px-5 self-end">Rechercher</Button>
        </div>
    );
};

export default HeroSearchFilter;
