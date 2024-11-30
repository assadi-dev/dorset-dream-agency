"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { columns } from "./columns";
import SimpleTable from "@/components/Datatable/BasicTable";
import SearchInput from "@/components/forms/SearchInput";

const LastTransaction = () => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Derniers Location - Ventes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex sm:flex-row sm:justify-between ">
                    <SearchInput />
                </div>
                <SimpleTable columns={columns} data={[]} />
            </CardContent>
        </Card>
    );
};

export default LastTransaction;
