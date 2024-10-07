"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";

const ListAccounts = ({ accounts }) => {
    return <DataTable columns={columns} data={accounts} />;
};

export default ListAccounts;
