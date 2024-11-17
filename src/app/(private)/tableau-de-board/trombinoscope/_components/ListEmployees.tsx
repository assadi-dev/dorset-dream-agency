"use client";
import React from "react";
import EmployeeCard from "./EmployeeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeBasic } from "@/app/types/employee";

type ListEmployeesProps = {
    employees?: EmployeeBasic[];
};
const ListEmployees = ({ employees }: ListEmployeesProps) => {
    return (
        <ScrollArea className="py-6 px-3 h-[72vh]">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] grid-rows-[repeat(auto-fill,380px)] gap-3 w-full h-full">
                {employees && employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)}
            </div>
        </ScrollArea>
    );
};

export default ListEmployees;
