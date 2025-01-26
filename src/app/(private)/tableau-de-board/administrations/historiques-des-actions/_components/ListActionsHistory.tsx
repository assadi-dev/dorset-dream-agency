"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UserActionsPage from "./UserActionsPage";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import SimpleTable from "@/components/Datatable/BasicTable";
import { Card, CardContent } from "@/components/ui/card";
import { UserActionColumnType } from "../types";

const ListActionsHistory = () => {
    const actions: UserActionColumnType[] = [
        { user: "Alice", action: "update", context: "Modifié email", date: "2025-01-25" },
        { user: "Bob", action: "delete", context: "Supprimé compte", date: "2025-01-22" },
        { user: "Bob", action: "create", context: "Ajout d'une propriété", date: "2025-01-22" },
    ];
    return (
        <div>
            <Card>
                <CardContent>
                    <SimpleTable columns={columns} data={actions} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ListActionsHistory;
