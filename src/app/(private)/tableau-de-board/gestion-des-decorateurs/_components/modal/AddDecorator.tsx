"use client"
import React from 'react'
import DecoratorForm from '../form/DecoratorForm'
import { createdecoratorAction } from '../../actions'
import useRouteRefresh from '@/hooks/useRouteRefresh'
import { DecoratorFormType } from '../schema'


const AddDecorator = () => {

    const refresh = useRouteRefresh();

    const handleOnSubmit = async (values: DecoratorFormType) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            if (value) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    if (value) {
                        formData.append(key, value?.toString());
                    }
                }
            }
        }


        await createdecoratorAction(formData);
        refresh.refreshWithParams();
    }

    return (
        <div>
            <DecoratorForm handleOnSubmit={handleOnSubmit} labelButton="Ajouter" className='w-full xl:w-[32vw]' />
        </div>
    )
}

export default AddDecorator