"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";

const ListLocation = ({ data }) => {
    return <DataTable columns={columns} data={data} />;
};

export default ListLocation;
