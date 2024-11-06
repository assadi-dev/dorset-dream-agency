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
import SwitchFilter from "./SwitchFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchSection = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const searchTermInParam = searchParams.get("search") || "";

    const updateRouteParams = (value: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.set("search", value);
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
    };

    const removeRouteParams = () => {
        const updatedSearchParams = new URLSearchParams(searchParams.toString());
        updatedSearchParams.delete("search");
        const updatePathName = pathname + "?" + updatedSearchParams.toString();
        router.push(updatePathName);
    };

    const submitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const searchTerm = formData.get("search") as string;

        if (searchTerm) {
            updateRouteParams(searchTerm);
        } else {
            removeRouteParams();
        }
    };

    return (
        <section className="my-3">
            <div className="bg-background p-5 flex items-center rounded-lg shadow-lg min-h-[3rem] justify-between">
                <SelectCategory />

                <form onSubmit={submitSearch} className="flex w-full max-w-sm items-center space-x-1">
                    <Input type="search" placeholder="Rechercher" name="search" defaultValue={searchTermInParam} />
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
