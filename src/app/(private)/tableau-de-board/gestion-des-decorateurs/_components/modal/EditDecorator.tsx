"use client"
import React from 'react'
import DecoratorForm from '../form/DecoratorForm'
import useRouteRefresh from '@/hooks/useRouteRefresh';

import { DecoratorData } from '../../type';
import useModalState from '@/hooks/useModalState';

const EditDecorator = () => {

    const refresh = useRouteRefresh();
    const { payload } = useModalState();

    const handleOnSubmit = async (values: any) => {
        const formData = new FormData();
        for (const [key, value] of values.entries()) {
            formData.append(key, value);
        }


        refresh.refreshWithParams();
    }

    const defaultValues = {
        lastName: payload?.lastName,
        firstName: payload?.firstName,
        phone: payload?.phone,
        email: payload?.email,
        speciality: payload?.speciality,
        experience: payload?.experience,
        averageTime: payload?.averageTime,
        photoID: payload?.photoID,

    };

    return (
        <div>
            <DecoratorForm defaultValues={defaultValues} handleOnSubmit={handleOnSubmit} labelButton="Ajouter" className='w-full xl:w-[32vw]' />
        </div>
    )
}

export default EditDecorator