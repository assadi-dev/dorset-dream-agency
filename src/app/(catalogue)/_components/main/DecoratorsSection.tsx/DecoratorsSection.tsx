"use client"
import React from 'react'
import useDecoratorApi from './hooks/useDecoratorApi'
import DecoratorCard from './DecoratorCard'

const DecoratorsSection = () => {

    const { collection, isLoading, isError, total } = useDecoratorApi()

    return (
        <section className='main my-8' >
            <div className='flex flex-col gap-2'>
                <h3 className='text-4xl font-bold text-center'>Nos Decorateurs</h3>
                <p className='text-muted-foreground text-center'>Decouvrez nos decorateurs</p>
            </div>
            <div className="my-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4" >
                <DecoratorCard decorator={{
                    id: 1,
                    name: "Sonia Petit",
                    phone: "555-56239",
                    email: "soniaP@dynasty8.fb",
                    speciality: "Speciality 1",
                    photoUrl: "https://images.unsplash.com/photo-1482482097755-0b595893ba63?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    experience: 8,
                    averageTime: 2,
                    createdAt: new Date(),
                }} />
            </div>

        </section>
    )
}

export default DecoratorsSection