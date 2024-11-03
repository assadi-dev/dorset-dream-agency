"use client";
import React from "react";
import ClientCard from "./ClientCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientPageRightAction from "./ClientPageRightAction";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import SimplePagination from "@/components/Paginations/SimplePagination";

type ListeClientsProps = {
    clients: Array<any>;
};
const ListeClients = ({ clients }: ListeClientsProps) => {
    const handleSearch = (v: string | null) => console.log(v);

    return (
        <div>
            <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr]  items-center">
                <SearchInputDataTable onSearch={handleSearch} />

                <ClientPageRightAction />
            </div>
            <div className="my-5 flex justify-between items-center">
                <div></div>
                <SimplePagination limit={5} totalItems={0} />
            </div>
            <ScrollArea className="h-[calc(85vh-220px)] rounded ">
                <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,350px)] justify-center gap-x-9 gap-y-9">
                    {clients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ListeClients;