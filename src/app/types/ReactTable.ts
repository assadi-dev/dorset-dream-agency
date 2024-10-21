import { Cell, Column, Getter, Row, RowData, Table } from "@tanstack/react-table";

export interface CellContext<TData extends RowData, TValue> {
    cell: Cell<TData, TValue>;
    column: Column<TData, TValue>;
    getValue: Getter<TValue>;
    renderValue: Getter<TValue | null>;
    row: Row<TData>;
    table: Table<TData>;
}

export type CellColumn = CellContext<any, any>;
