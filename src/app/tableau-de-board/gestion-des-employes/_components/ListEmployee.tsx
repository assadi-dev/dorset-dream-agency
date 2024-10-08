"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import employeMock from "../employee-mock";

const ListEmployee = ({ employees }) => {
    return <DataTable columns={columns} data={employees} />;
};

export default ListEmployee;
