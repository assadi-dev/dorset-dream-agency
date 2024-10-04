"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";

const ListLocation = () => {
    return <DataTable columns={columns} data={[]} />;
};

export default ListLocation;
