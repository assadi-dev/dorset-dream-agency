import { ColumnDef } from "@tanstack/react-table";
import { DecoratorData } from "../../type";
import DecoratorCell from "./DecoratorCell";
import { CellColumn } from "@/app/types/ReactTable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import ActionsDecoratorProfile from "./ActionsDecoratorProfile";


export const DecoratorProfileColumns: ColumnDef<DecoratorData>[] = [

    {
        id: "name",
        header: "Nom",
        accessorKey: "name",
        cell: ({ row: { original } }) => <DecoratorCell decorator={original} />
    },
    { id: "email", header: "Email", accessorKey: "email" },
    { id: "phone", header: "Téléphone", accessorKey: "phone" },
    { id: "speciality", header: "Specialité", accessorKey: "speciality" },

]



export const DecoratorProfileActionsColumn: ColumnDef<DecoratorData> = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }: CellColumn) => (
        <DropdownActions>
            <ActionsDecoratorProfile payload={row.original} />
        </DropdownActions>
    ),
};