import React, { useRef } from "react";
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import EmptyRow from "./EmptyRow";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import LoadingRow from "./LoadingRow";
import { useSortable } from '@dnd-kit/react/sortable';
import { DragEndEvent, DragOverlay } from "@dnd-kit/react";
import ReorderRowProvider from "./ReorderRowProvider";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    isReorder?: boolean;
    onDragEnd?: (event: DragEndEvent) => void;
};

function DataTable<TData, TValue>({ columns, data, isLoading, isReorder = false, onDragEnd }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const restrictElement = useRef<HTMLDivElement>(null);

    return (
        <ScrollArea className="h-[calc(80vh-280px)] rounded-md  bg-dynasty-table">
            <ReorderRowProvider restrictElement={restrictElement.current} onDragEnd={onDragEnd} >
                <Table className="dataTable relative" >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody ref={restrictElement as any}>
                        {isLoading ? (
                            <LoadingRow columns={columns} />
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <SortableRow key={row.id} row={row} index={index} disabled={!isReorder} />
                            ))
                        ) : (
                            <EmptyRow columns={columns} />
                        )}
                    </TableBody>
                </Table>
            </ReorderRowProvider>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export default DataTable;



const SimpleRow = ({ row }: { row: Row<any> }) => {
    return (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}

const SortableRow = ({ row, index, disabled = true }: { row: Row<any>, index: number, disabled: boolean }) => {
    const { ref, isDragging } = useSortable({ id: `table-sortable-${row.id}`, index, data: row.original, disabled })

    const STYLES_DRAGGING = isDragging ? "bg-background z-10" : ""

    return (

        <TableRow data-state={row.getIsSelected() && "selected"} ref={ref} >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={` ${STYLES_DRAGGING}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}

        </TableRow>
    );
}