"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, MoreHorizontal, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import FormFieldSelect from "@/components/forms/FormFieldSelect";
import SelectCategory from "./SelectCategory";
import OrderSelect from "./OrderSelect";

const SearchSection = () => {
    const onSearch = (event: any) => {
        event.preventDefault();
        const values = event.target.search;
    };

    return (
        <section className="my-3">
            <div className="bg-background p-5 flex items-center rounded-lg shadow-lg min-h-[3rem] justify-between">
                <SelectCategory />

                <form onSubmit={onSearch} className="flex w-full max-w-sm items-center space-x-1">
                    <Input type="search" placeholder="Rechercher" name="search" />
                    <Button
                        type="submit"
                        className="active:scale-90 transition-all duration-300 bg-gradient-to-br from-sky-500 via-blue-950 to-primary"
                    >
                        <Search />
                    </Button>
                </form>
                <div className="px-5">
                    <OrderSelect />
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
