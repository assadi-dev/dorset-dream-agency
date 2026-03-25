"use client"
import React from 'react'
import DecoratorForm from '../form/DecoratorForm'


const AddDecorator = () => {
    return (
        <div>
            <DecoratorForm handleOnSubmit={async () => { }} labelButton="Ajouter" className='w-full xl:w-[32vw]' />
        </div>
    )
}

export default AddDecorator