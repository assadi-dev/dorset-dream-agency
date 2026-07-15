"use client"
import React from "react";
import { flexRender, Row, Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSortable } from '@dnd-kit/react/sortable';



// Permet à une cellule (ex: poignée de drag) de s'enregistrer comme handle
// du useSortable de sa ligne : le drag ne démarre alors que depuis la poignée,
// et les éléments interactifs (checkbox, switch...) restent cliquables
const RowDragHandleContext = React.createContext<((element: Element | null) => void) | null>(null);

export const useRowDragHandle = () => React.useContext(RowDragHandleContext);

export const SortableRow = ({ table, getRowId }: { table: Table<any>, getRowId: any }) => {
    return (
        table.getRowModel().rows.map((row, index) => (
            <RowDraggable key={getRowId ? getRowId(row, index) : row.id} row={row} disabled={false} index={index} getRowId={getRowId} />
        ))
    );
}

export const RowDraggable = ({ row, disabled, index, getRowId }: { row: Row<any>, disabled: boolean, index: number, getRowId: any }) => {
    const { ref, handleRef, isDragging } = useSortable({ id: `table-sortable-${row.id}`, index, data: row.original, disabled })
    const STYLES_DRAGGING = isDragging ? "bg-background z-10" : ""

    return (
        <RowDragHandleContext.Provider value={handleRef}>
            <TableRow key={getRowId ? getRowId(row, index) : row.id} data-state={row.getIsSelected() && "selected"} ref={ref} >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={` ${STYLES_DRAGGING}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}

            </TableRow>
        </RowDragHandleContext.Provider>
    )
}

export const RenderRow = ({ table, getRowId }: { table: Table<any>, getRowId: any }) => {
    return (
        table.getRowModel().rows.map((row) => (
            <TableRow key={getRowId ? getRowId(row) : row.id} data-state={row.getIsSelected() && "selected"} >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}

            </TableRow>
        ))
    )
}