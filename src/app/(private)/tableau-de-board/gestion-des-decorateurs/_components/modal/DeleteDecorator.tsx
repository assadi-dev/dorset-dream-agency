"use client"
import AlertModalContent from '@/components/Modals/AlertModalContent';
import useModalState from '@/hooks/useModalState';
import React from 'react'
import { deleteDecorator } from '../../actions';
import useRouteRefresh from '@/hooks/useRouteRefresh';

const DeleteDecorator = () => {
    const { payload, closeModal } = useModalState();
    const refresh = useRouteRefresh();



    const handleConfirm = async () => {
        try {
            const formData = new FormData();
            const ids = payload.ids as number[];
            ids.forEach((id) => formData.append("ids", String(id)));
            await deleteDecorator(ids)
            payload?.resetSelected && payload?.resetSelected();
            closeModal();
            refresh.refreshWithParams();

        } catch (error: any) {
            throw error;
        }
    }


    const handleCancel = async () => {
        closeModal();
    };

    return (
        <AlertModalContent
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            successMessage={`le decorateur ${payload.name} a été supprimé avec succès`}
            className="flex justify-end gap-3 lg:w-[25vw]"
        />
    );
}

export default DeleteDecorator