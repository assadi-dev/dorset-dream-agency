
import React from 'react'
import SearchSection from './_components/SearchSection';
import ListDecorators from './_components/ListDecorators';
import { getDecoratorProfileCollections } from '@/database/drizzle/repositories/decoratorProfiles';

type SearchParams = {
    searchParams: {
        search: string;
        limit: number;
        page: number;

    };
};
const DecoratorPage = async ({ searchParams }: SearchParams) => {

    const ListDecoratorAsync = async () => {
        const limit = Number(searchParams.limit) || 15;
        const page = Number(searchParams.page) || 1;
        const search = searchParams.search || "";
        const decoratorsResultCollection = await getDecoratorProfileCollections({ limit, page, search });
        return <ListDecorators decorators={decoratorsResultCollection.data as any[] || []} totalItems={decoratorsResultCollection.totalItems} limit={searchParams.limit} />;
    };
    return (
        <div className='h-full min-h-screen'>
            {searchParams.search && (
                <p className="font-semibold text-2xl mb-1">Recherche de : {searchParams.search} </p>
            )}

            <SearchSection />
            <React.Suspense>
                <ListDecoratorAsync />
            </React.Suspense>
        </div>
    )
}

export default DecoratorPage