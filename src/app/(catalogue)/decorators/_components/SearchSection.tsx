"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRouteRefresh from '@/hooks/useRouteRefresh';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const SearchSection = () => {

    const { searchParams, updateSearchParamWitObjectAndRefresh } = useRouteRefresh();

    const searchTermInParam = searchParams.get("search") || "";

    const submitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const searchTerm = formData.get("search") as string;

        if (searchTerm) {
            updateSearchParamWitObjectAndRefresh({ search: searchTerm });
        } else {
            updateSearchParamWitObjectAndRefresh({ search: "" });
        }
    };
    return (
        <section className="my-4">
            <div className=" bg-background p-5 flex flex-col gap-3 lg:flex-row items-center rounded-lg shadow-lg min-h-[3rem] justify-between">
                <form onSubmit={submitSearch} className="w-full flex flex-col lg:flex-row gap-3">
                    <div className="flex gap-3 w-full flex-col sm:flex-row">
                        <div className="w-full">
                            <p className="font-semibold text-slate-500">Rechercher un decorateur</p>
                            <Input
                                type="search"
                                placeholder="Rechercher un decorateur, nom,specialité,email,telephone"
                                name="search"
                                defaultValue={searchTermInParam}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="active:scale-90 transition-all duration-300 bg-primary w-full flex gap-2 items-center self-end sm:w-fit"
                        >
                            <Search /> Rechercher
                        </Button>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-center w-full justify-end">



                    </div>
                </form>
            </div>
        </section>
    )
}

export default SearchSection