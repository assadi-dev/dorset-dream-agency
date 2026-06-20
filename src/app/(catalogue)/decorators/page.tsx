
import React from 'react'
import SearchSection from './_components/SearchSection';
import ListDecorators from './_components/ListDecorators';
import { getDecoratorProfileCollections } from '@/database/drizzle/repositories/decoratorProfiles';

type SearchParams = {
    searchParams: Promise<{
        search: string;
        limit: number;
        page: number;

    }>;
};

const ListDecoratorAsync = async ({ filter }: { filter: { limit: number; page: number; search: string } }) => {

    const decoratorsResultCollection = await getDecoratorProfileCollections(filter);
    return <ListDecorators decorators={decoratorsResultCollection.data as any[] || []} totalItems={decoratorsResultCollection.totalItems} limit={filter.limit} />;
};
const DecoratorPage = async ({ searchParams }: SearchParams) => {

    const { limit, page, search } = await searchParams;
    const filter = { limit: Number(limit) || 15, page: Number(page) || 1, search: search || "" };
    return (

        <div className='h-full min-h-screen'>
            {filter.search && (
                <p className="font-semibold text-2xl mb-1">Recherche de : {filter.search} </p>
            )}

            <SearchSection />
            <React.Suspense>
                <ListDecoratorAsync filter={filter} />
            </React.Suspense>
        </div>
    )
}

export default DecoratorPage