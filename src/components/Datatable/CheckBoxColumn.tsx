import React from "react";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef, Table } from "@tanstack/react-table";

type CheckBoxColumnProps = {
    onCheckedChange?: (selected: Record<string, string>) => void;
    onCheckedAllChange?: (selected: Record<string, string>[]) => void;
    selected?: Record<string, string>[];
};
const CheckBoxColumn = ({ onCheckedChange, onCheckedAllChange, selected }: CheckBoxColumnProps) => {
    const handleSelectRow = (row: any, checked: any) => {
        const object = row.original;
        if (!object?.id) return;

        if (onCheckedChange) {
            onCheckedChange(object);
        }
    };

    const handleSelectAllRow = (table: Table<any>, checked: any) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);

        if (checked) {
            if (onCheckedAllChange) {
                const old = selected ? [...selected] : [];
                const addUniqueItem = [...new Set([...old, ...objects])];

                onCheckedAllChange(addUniqueItem);
            }
        } else {
            if (onCheckedAllChange) {
                const old = selected ? [...selected] : [];
                const remove = old.filter((it) => {
                    const object = objects.find((item) => JSON.stringify(item) === JSON.stringify(it));
                    return JSON.stringify(it) !== JSON.stringify(object);
                });
                onCheckedAllChange(remove);
            }
        }
    };

    const isSomeRowChecked = (table: Table<any>) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);
        return objects.some((v) => selected?.some((vi) => JSON.stringify(vi) === JSON.stringify(v)));
    };
    const isAllRowChecked = (table: Table<any>) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);
        return objects.every((v) => selected?.some((vi) => JSON.stringify(vi) === JSON.stringify(v)));
    };

    const column: ColumnDef<any> = {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="bg-white ring-white ring-1 text-primary"
                checked={isAllRowChecked(table) || (isSomeRowChecked(table) && "indeterminate")}
                onCheckedChange={(value) => handleSelectAllRow(table, value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => {
            return (
                <Checkbox
                    className="bg-white ring-white ring-1"
                    checked={
                        selected && selected?.find((item) => JSON.stringify(item) === JSON.stringify(row.original))
                            ? true
                            : false
                    }
                    onCheckedChange={(value) => handleSelectRow(row, value)}
                    aria-label="Select row"
                />
            );
        },
    };
    return { ...column };
};

export default CheckBoxColumn;
