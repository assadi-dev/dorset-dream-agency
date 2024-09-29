"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";

const ListProperties = () => {
    return (
        <div>
            <DataTable columns={columns} data={[]} />
        </div>
    );
};

export default ListProperties;
