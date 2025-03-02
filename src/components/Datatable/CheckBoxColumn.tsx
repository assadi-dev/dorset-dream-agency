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

    const handleSelectedRow = (table: Table<any>, checked: any) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);

        if (checked) {
            if (onCheckedAllChange) {
                const old = selected ? [...selected] : [];
                const array = new Set([...old, ...objects])
                    .entries()
                    .toArray()
                    .map((it) => it[0]);

                onCheckedAllChange(array);
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

        setCheckedAll(checked);
    };

    const isCheckedAll = (table: Table<any>) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);
        return objects.some((v) => selected?.some((vi) => JSON.stringify(vi) === JSON.stringify(v)));
    };

    const column: ColumnDef<any> = {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="bg-white"
                checked={isCheckedAll(table)}
                onCheckedChange={(value) => handleSelectedRow(table, value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => {
            return (
                <Checkbox
                    className="bg-white"
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
