"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import employeMock from "../employee-mock";

const ListEmployee = () => {
    return <DataTable columns={columns} data={[]} />;
};

export default ListEmployee;
