"use client"
import React from 'react'
import { DecoratorData } from '../type';
import SearchInput from '@/components/forms/SearchInput';
import { decoratorProfileCollections } from '../helpers';
import DecoratorProfilItemCard from './DecoratorProfilItemCard';
import DataTable from '@/components/Datatable/Datatable';
import { DecoratorProfileColumns } from './table/columns';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Pagination } from 'swiper/modules';
import PaginationDataTable from '@/components/Datatable/PaginationDataTable';
import SimplePagination from '@/components/Paginations/SimplePagination';

type ListDecoratorProfileProps = {
    decorators: Array<DecoratorData>;
    totalItems: number;
    limit: number;

}; const ListDecoratorProfile = ({ decorators, totalItems = 0, limit = 15 }: ListDecoratorProfileProps) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center my-3'>
                <div></div>
                <div>
                    <Button type='button'><Plus className='h-4 w-4 mr-1' /> Ajouter un decorateur</Button>
                </div>
            </div>
            <Card className='p-3 w-full'>
                <div className='flex justify-between items-center my-3'>
                    <SearchInput placeholder='Rechercher un decorateur' />
                    <div>

                    </div>
                </div>
                <DataTable columns={DecoratorProfileColumns} data={decoratorProfileCollections} isLoading={false} />
                <CardFooter>
                    <div className="flex justify-between items-center w-full">
                        <div></div>

                        <div className="self-end">
                            {<SimplePagination totalItems={totalItems} limit={limit} />}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ListDecoratorProfile