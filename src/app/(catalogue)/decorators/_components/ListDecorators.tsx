"use client"
import React from 'react'
import { DecoratorCollectionData } from '../type';
import DecoratorCard from './DecoratorCard';
import useDecoratorApi from '../../_components/main/DecoratorsSection.tsx/hooks/useDecoratorApi';
import EmptyDecorator from '../../_components/main/DecoratorsSection.tsx/EmptyDecorator';
import SimplePagination from '@/components/Paginations/SimplePagination';

type ListDecoratorsProps = {
    decorators: DecoratorCollectionData[];
    totalItems: number;
    limit?: number;

}
const ListDecorators = ({ decorators, totalItems = 0, limit = 15 }: ListDecoratorsProps) => {



    return (
        <section className='main my-8'>

            <div className='flex justify-between items-center'>
                <p className='text-muted-foreground'>Nombre de decorateurs : {totalItems}</p>
                <div>
                    <SimplePagination totalItems={totalItems} limit={limit} />
                </div>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 justify-center items-center" >
                {decorators.length === 0 ? (
                    <EmptyDecorator />
                ) : (
                    decorators.map((item) => (
                        <DecoratorCard key={item.id} decorator={item} />
                    ))
                )}
            </div>
        </section>
    )
}

export default ListDecorators