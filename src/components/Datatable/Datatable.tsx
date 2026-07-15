import React, { useRef } from "react";
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyRow from "./EmptyRow";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import LoadingRow from "./LoadingRow";
import { DragEndEvent } from "@dnd-kit/react";
import ReorderRowProvider from "./ReorderRowProvider";
import { RenderRow, SortableRow } from "./TableRowComponents";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    isSortable?: boolean;
    onDragEnd?: (event: DragEndEvent) => void;
    getRowId?: (row: Row<TData>) => string;
};

function DataTable<TData, TValue>({ columns, data, isLoading, isSortable = false, onDragEnd, getRowId }: DataTableProps<TData, TValue>) {
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

                            isSortable ? (
                                <SortableRow table={table} getRowId={getRowId} />

                            ) : (
                                <RenderRow table={table} getRowId={getRowId} />
                            )
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


