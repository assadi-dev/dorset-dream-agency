"use client";
import SearchInput from "@/components/forms/SearchInput";
import { Button } from "@/components/ui/button";
import React from "react";
import HeroSelectCategories from "./HeroSelectCategorie";
import HeroSelectTransaction from "./HeroSelectTransaction";
import { useRouter } from "next/navigation";

const HeroSearchFilter = () => {
    const [searchState, dispatch] = React.useReducer((prev: any, state: any) => ({ ...prev, ...state }), {
        search: "",
        category: "",
        transaction: "",
    });
    const router = useRouter();
    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        const { search, category } = searchState;
        const href = window.location.href;
        const cleanUrl = new URL(href + "properties");
        cleanUrl.searchParams.append("category", category);
        search && cleanUrl.searchParams.append("search", search);
        router.push(cleanUrl.href);
    };
    return (
        <form
            onSubmit={handleSearchSubmit}
            className="bg-white w-full lg:w-4/5 mx-auto p-3 lg:p-6 flex flex-col lg:flex-row  justify-center gap-3 items-center rounded-lg lg:min-h-20 lg:translate-y-[-100%] z-10 relative shadow-md"
        >
            <div className="w-full">
                <label htmlFor="search">
                    <p className="font-bold mb-2 text-slate-500"> Rechercher une propriété</p>
                </label>
                <SearchInput name="search" classNames={{ inputWrapper: "max-w-full " }} />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3">
                <div className="w-full">
                    <label htmlFor="category">
                        <p className="font-bold mb-2 text-slate-500"> Catégorie</p>
                    </label>
                    <HeroSelectCategories dispatch={dispatch} />
                </div>
                <div className="w-full lg:w-2/3">
                    <label htmlFor="search-input">
                        <p className="font-bold mb-2 text-slate-500"> Type</p>
                    </label>
                    <HeroSelectTransaction />
                </div>
            </div>

            <Button type="submit" className="w-full lg:w-fit px-5 self-end">
                Rechercher
            </Button>
        </form>
    );
};

export default HeroSearchFilter;
