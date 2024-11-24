"use client";
import React from "react";
import EmployeeCard from "./EmployeeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeBasic } from "@/app/types/employee";
import EmptyEmployee from "./EmptyEmployee";
import SimplePagination from "@/components/Paginations/SimplePagination";

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
            <div className="flex justify-between">
                <div></div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <ScrollArea className="py-6 px-3 h-[72vh]">
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
