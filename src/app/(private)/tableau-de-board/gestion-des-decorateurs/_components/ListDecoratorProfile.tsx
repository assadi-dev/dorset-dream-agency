"use client"
import React from 'react'
import { DecoratorData } from '../type';
import SearchInput from '@/components/forms/SearchInput';
import { decoratorProfileCollections } from '../helpers';
import DecoratorProfilItemCard from './DecoratorProfilItemCard';
import DataTable from '@/components/Datatable/Datatable';
import { DecoratorProfileActionsColumn, DecoratorProfileColumns } from './table/columns';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Pagination } from 'swiper/modules';
import PaginationDataTable from '@/components/Datatable/PaginationDataTable';
import SimplePagination from '@/components/Paginations/SimplePagination';
import useGetRoleUser from '@/hooks/useRoleUser';
import useSelectTableRow from '@/hooks/useSelectTableRow';
import { ACTIONS_CONTROL_PERMISSION } from '@/lib/access';
import CheckBoxColumn from '@/components/Datatable/CheckBoxColumn';
import AddDecoratorButton from './table/AddDecoratorButton';
import SearchInputDataTable from '@/components/Datatable/SearchInputDataTable';

type ListDecoratorProfileProps = {
    decorators: Array<DecoratorData>;
    totalItems: number;
    limit: number;

}; const ListDecoratorProfile = ({ decorators, totalItems = 0, limit = 15 }: ListDecoratorProfileProps) => {


    const role = useGetRoleUser();
    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();

    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const columns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...DecoratorProfileColumns, DecoratorProfileActionsColumn]
        : DecoratorProfileColumns;

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center my-3'>
                <div></div>
                <div>
                    <AddDecoratorButton />
                </div>
            </div>
            <Card className='p-3 w-full bg-white'>
                <div className='flex justify-between items-center my-3'>
                    <SearchInputDataTable />
                    <div>

                    </div>
                </div>
                <DataTable columns={columns} data={decorators} isLoading={false} />
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