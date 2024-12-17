"use client";
import React from "react";
import EmployeeCard from "./EmployeeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeBasic } from "@/app/types/employee";
import EmptyEmployee from "./EmptyEmployee";
import SimplePagination from "@/components/Paginations/SimplePagination";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

type ListEmployeesProps = {
    employees?: EmployeeBasic[];
    totalItems: number;
    limit: number;
};
const ListEmployees = ({ employees, totalItems, limit }: ListEmployeesProps) => {
    const EMPLOYEES_LIST = React.useMemo(() => {
        if (!employees) return [];
        return employees;
    }, [employees]);

    return (
        <>
            <div className="sm:flex sm:justify-between sticky top-[0] sm:top-[62px] z-[10] bg-white shadow rounded py-3 mt-5">
                <div className="sm:flex justify-between items-center px-3 w-full sm:w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <ScrollArea className="py-3 px-3">
                {EMPLOYEES_LIST.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] grid-rows-[repeat(auto-fill,380px)] gap-3 w-full h-full">
                        {EMPLOYEES_LIST.map((employee) => (
                            <EmployeeCard key={employee.id} employee={employee} />
                        ))}
                    </div>
                ) : (
                    <EmptyEmployee />
                )}
            </ScrollArea>
        </>
    );
};

export default ListEmployees;
