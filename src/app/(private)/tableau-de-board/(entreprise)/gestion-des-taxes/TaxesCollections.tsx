"use client"

import ListTaxes from "./_components/table/ListTaxes";
import useTaxeCollections from "./_hook/useTaxeCollections";



const TaxesCollection = ({ filter }: any) => {
    const { collections, isLoading, isError, limit, page, search, totalItems } = useTaxeCollections();
    return (
        collections && (
            <ListTaxes taxes={collections?.data || []} limit={limit} totalItems={totalItems} />
        )
    );
};

export default TaxesCollection;