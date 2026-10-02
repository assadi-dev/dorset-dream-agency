"use client"

import SimplePagination from "@/components/Paginations/SimplePagination";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import React from "react";


type EmployeeSearchFilterBarProps = {
    limit: number;
    totalItems: number;
}

export const EmployeeSearchFilterBar = ({ limit, totalItems }: EmployeeSearchFilterBarProps) => {

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const navbar = document.querySelector(".navbar");
            if (scrollTop > 60) {
                navbar?.classList.add("fixed");
            } else {
                navbar?.classList.remove("fixed");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sm:flex sm:justify-between sticky top-[0] sm:top-[60px] z-[5] bg-dynasty-card shadow rounded-full border px-5 py-2 mt-5">
            <div className="sm:flex justify-between items-center px-3 w-full sm:w-[25vw]">
                <SearchInputDataTable />
            </div>
            <SimplePagination limit={limit} totalItems={totalItems} />
        </div>
    )
}