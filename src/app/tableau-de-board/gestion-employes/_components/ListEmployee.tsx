"use client";
import { execution_delayed } from "@/lib/utils";
import React from "react";
import { columns } from "./columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DataTable from "@/components/Datatable/Datatable";
import employeMock from "../employee-mock";

const ListEmployee = () => {
    return <DataTable columns={columns} data={employeMock} />;
};

export default ListEmployee;
