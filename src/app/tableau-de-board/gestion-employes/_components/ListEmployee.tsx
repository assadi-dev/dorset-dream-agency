"use client";
import { execution_delayed } from "@/lib/utils";
import React from "react";
import { columns } from "./columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DataTable from "@/components/Datatable/Datatable";

const ListEmployee = () => {
    return <DataTable columns={columns} data={[]} />;
};

export default ListEmployee;
