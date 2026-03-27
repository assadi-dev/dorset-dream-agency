"use client"
import React from 'react'
import DecoratorForm from '../form/DecoratorForm'
import useRouteRefresh from '@/hooks/useRouteRefresh';

import { DecoratorData } from '../../type';
import useModalState from '@/hooks/useModalState';
import { updateDecoratorAction } from '../../actions';
import { DecoratorFormType } from '../schema';

const EditDecorator = () => {

    const refresh = useRouteRefresh();
    const { payload } = useModalState();

    const handleOnSubmit = async (values: DecoratorFormType) => {
        const formData = new FormData();
        formData.append("id", payload?.id.toString());
        for (const [key, value] of Object.entries(values)) {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                if (value) {
                    formData.append(key, value?.toString());
                }
            }
        }

        await updateDecoratorAction(formData)
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
            <DecoratorForm defaultValues={defaultValues} handleOnSubmit={handleOnSubmit} labelButton="Modifier" className='w-full xl:w-[32vw]' />
        </div>
    )
}

export default EditDecorator