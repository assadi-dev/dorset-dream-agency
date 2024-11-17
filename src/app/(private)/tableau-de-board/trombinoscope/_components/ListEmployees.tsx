import { wait } from "@/lib/utils";
import React from "react";
import EmployeeCard from "./EmployeeCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const ListEmployees = async () => {
    return (
        <ScrollArea className="py-6 px-3 h-[72vh]">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] grid-rows-[repeat(auto-fill,380px)] gap-3 w-full h-full">
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
                <EmployeeCard />
            </div>
        </ScrollArea>
    );
};

export default ListEmployees;
