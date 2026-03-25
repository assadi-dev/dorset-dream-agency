"use client"
import React from 'react'
import useDecoratorApi from './hooks/useDecoratorApi'
import DecoratorCard from './DecoratorCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import EmptyDecorator from './EmptyDecorator'

const DecoratorsSection = () => {

    const { collections, isLoading, isError, total } = useDecoratorApi()


    return (
        <section className='main my-8' >
            <div className='flex flex-col gap-2'>
                <h3 className='text-4xl font-bold text-center'>Nos Decorateurs</h3>
                <p className='text-muted-foreground text-center'>Decouvrez nos decorateurs</p>
            </div>
            <div className="my-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 justify-center items-center" >
                {collections.length === 0 ? (
                    <EmptyDecorator />
                ) : (
                    collections.map((item) => (
                        <DecoratorCard key={item.id} decorator={item} />
                    ))
                )}
            </div>
            {
                collections.length > 0 && <div className='flex justify-center items-center'>
                    <Button className='bg-primary text-white hover:bg-primary/80' size="lg" asChild >
                        <Link href="/decorators">Voir Plus</Link>
                    </Button>
                </div>
            }
        </section>
    )
}

export default DecoratorsSection