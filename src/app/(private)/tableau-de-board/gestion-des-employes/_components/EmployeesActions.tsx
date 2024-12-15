"use client";
import React from "react";
import ActionColumnButton from "@/components/Datatable/ActionColumnButton";
import useModalState from "@/hooks/useModalState";
import { datetimeFormatFr, datetimeFormatFr2, formatFullDateShortTextWitHours } from "@/lib/date";
import EditForm from "./forms/EditForm";
import DeleteForm from "./forms/DeleteForm";
import useGetRoleUser from "@/hooks/useRoleUser";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { ActionPermission } from "@/app/types/user";
import UploadPhotoForm from "./forms/UploadPhotoForm";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ImagePlus, Pen, Trash } from "lucide-react";

type EmployeesActionsProps = {
    payload: any;
    canUpload?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
} & ActionPermission;
const EmployeesActions = ({ payload, canDelete, canUpdate, canUpload }: EmployeesActionsProps) => {
    const { openModal } = useModalState();

    const handleClickUploadPhoto = () => {
        openModal({
            title: payload.name,
            description: `Mettre à jour la photo de ${payload.name}`,
            payload: payload,
            component: () => <UploadPhotoForm />,
            onInteractOutside: false,
        });
    };

    const handleClickEdit = () => {
        openModal({
            title: `Modifier un Employé`,
            description: `Modifier les  informations de ${payload.name}`,
            payload: payload,
            component: () => <EditForm />,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un Employé`,
            description: `Supprimer les informations de ${payload.name}`,
            component: DeleteForm,
            payload: payload,
        });
    };

    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {canUpload && (
                <DropdownMenuItem onClick={handleClickUploadPhoto} className="text-primary">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Changer la photo
                </DropdownMenuItem>
            )}
            {canUpdate && (
                <DropdownMenuItem onClick={handleClickEdit} className="text-primary">
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </DropdownMenuItem>
            )}
            {canDelete && (
                <DropdownMenuItem onClick={handleClickDelete} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </DropdownMenuItem>
            )}
        </>
    );
};

export default EmployeesActions;
