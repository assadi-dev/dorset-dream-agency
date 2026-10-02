"use client"

import SimplePagination from "@/components/Paginations/SimplePagination";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import React from "react";


type EmployeeSearchFilterBarProps = {
    limit: number;
    totalItems: number;
}

export const EmployeeSearchFilterBar = ({ limit, totalItems }: EmployeeSearchFilterBarProps) => {

    return (
        <div className="sm:flex sm:justify-between sticky top-[0] sm:top-[60px] z-[5] bg-dynasty-card shadow rounded md:rounded-full border px-5 py-2 mt-5">
            <div className="sm:flex justify-between items-center px-3 w-full sm:w-[25vw]">
                <SearchInputDataTable />
            </div>
            <SimplePagination limit={limit} totalItems={totalItems} />
        </div>
    )
}