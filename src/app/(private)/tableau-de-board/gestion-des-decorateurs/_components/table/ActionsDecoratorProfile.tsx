import React from 'react'
import { DecoratorData } from '../../type';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Pen, Trash } from 'lucide-react';
import useModalState from '@/hooks/useModalState';
import EditDecorator from '../modal/EditDecorator';
import DeleteDecorator from '../modal/DeleteDecorator';
import { Button } from '@/components/ui/button';

type ActionsDecoratorProfileProps = {
    payload: DecoratorData;
}
const ActionsDecoratorProfile = ({ payload }: ActionsDecoratorProfileProps) => {
    const { openModal } = useModalState();



    const handleClickEdit = () => {
        openModal({
            title: `Modifier un decorateur`,
            payload: payload,
            component: EditDecorator,
        });
    };

    const handleClickDelete = () => {
        openModal({
            title: `Supprimer un decorateur`,
            description: `${payload.name}`,
            payload: { ids: [payload.id], name: payload.name },
            component: DeleteDecorator,
        });
    };
    return (
        <>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="dropdown-action-item">
                <Button
                    type='button'
                    variant="ghost"
                    onClick={handleClickEdit}
                    className="flex items-center justify-start w-full"
                >
                    <Pen className="mr-2 h-4 w-4" />
                    Modifier
                </Button>

            </DropdownMenuItem>
            <DropdownMenuItem asChild className="dropdown-action-danger">
                <Button
                    type='button'
                    variant="ghost"
                    onClick={handleClickDelete}
                    className="flex items-center justify-start w-full"
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                </Button>
            </DropdownMenuItem>

        </>
    )
}

export default ActionsDecoratorProfile