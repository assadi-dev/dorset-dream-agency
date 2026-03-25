import { ColumnDef } from "@tanstack/react-table";
import { DecoratorData } from "../../type";
import DecoratorCell from "./DecoratorCell";


export const DecoratorProfileColumns: ColumnDef<DecoratorData>[] = [

    {
        id: "name",
        header: "Nom",
        accessorKey: "name",
        cell: ({ row: { original } }) => <DecoratorCell decorator={original} />
    },
    { id: "email", header: "Email", accessorKey: "email" },
    { id: "phone", header: "Téléphone", accessorKey: "phone" },
    { id: "specialite", header: "Specialité", accessorKey: "specialite" },

]

