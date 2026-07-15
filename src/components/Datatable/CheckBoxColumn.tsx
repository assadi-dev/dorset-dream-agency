import React from "react";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef, Table } from "@tanstack/react-table";

type CheckBoxColumnProps = {
    onCheckedChange?: (selected: Record<string, string>) => void;
    onCheckedAllChange?: (selected: Record<string, string>[]) => void;
    selected?: Record<string, string>[];
};
// Comparaison par id : les objets lignes sont recréés à chaque refetch
// (et leurs valeurs peuvent changer, ex: orderPosition après un reorder),
// une comparaison par référence ou JSON.stringify casse la sélection
const isSameRow = (a: any, b: any) => a?.id !== undefined && String(a.id) === String(b?.id);

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
                const addUniqueItem = [...old, ...objects].filter(
                    (item, index, arr) => arr.findIndex((it) => isSameRow(it, item)) === index,
                );

                onCheckedAllChange(addUniqueItem);
            }
        } else {
            if (onCheckedAllChange) {
                const old = selected ? [...selected] : [];
                const remove = old.filter((it) => !objects.some((item) => isSameRow(item, it)));
                onCheckedAllChange(remove);
            }
        }
    };

    const isSomeRowChecked = (table: Table<any>) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);
        return objects.some((v) => selected?.some((vi) => isSameRow(vi, v)));
    };
    const isAllRowChecked = (table: Table<any>) => {
        const rows = table.getPaginationRowModel().rows;
        const objects = rows.map((item) => item.original);
        return objects.every((v) => selected?.some((vi) => isSameRow(vi, v)));
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
                    checked={selected?.some((item) => isSameRow(item, row.original)) ?? false}
                    onCheckedChange={(value) => handleSelectRow(row, value)}
                    aria-label="Select row"
                />
            );
        },
    };
    return { ...column };
};

export default CheckBoxColumn;
