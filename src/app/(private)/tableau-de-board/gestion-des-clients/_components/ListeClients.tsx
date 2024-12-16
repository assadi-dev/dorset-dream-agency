"use client";
import React, { useState } from "react";
import ClientCard from "./ClientCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientPageRightAction from "./ClientPageRightAction";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import ClientCardSelect from "./ClientCardSelect";
import { Button } from "@/components/ui/button";
import SelectAction from "./SelectAction";

type ListeClientsProps = {
    clients: Array<any>;
    totalItems: number;
    limit: number;
};
const ListeClients = ({ clients, totalItems, limit }: ListeClientsProps) => {
    const [state, setState] = useState<{ mode: "multiple" | "none"; selected: number[] }>({
        mode: "none",
        selected: [],
    });

    const onClickCard = (value: { id: number; checked: boolean }) => {
        if (value.checked) {
            setState((current) => ({
                ...current,
                selected: [...current.selected, value.id],
            }));
        } else {
            setState((current) => ({
                ...current,
                selected: [...current.selected].filter((id) => id !== value.id),
            }));
        }
    };

    const toggleModCard = () => {
        setState((current) => {
            current.selected = [];
            if (current.mode === "none") current.mode = "multiple";
            else current.mode = "none";
            return { ...current };
        });
    };

    return (
        <div>
            <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr]  items-center">
                <SearchInputDataTable />

                <ClientPageRightAction />
            </div>

            <div className="my-5 flex justify-between items-center">
                <SelectAction toggleModCard={toggleModCard} mode={state.mode} selected={state.selected} />
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <ScrollArea className="h-[calc(85vh-220px)] rounded ">
                <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,350px)] justify-center gap-x-9 gap-y-9">
                    {clients.map((client) =>
                        state.mode === "multiple" ? (
                            <ClientCardSelect
                                key={client.id}
                                client={client}
                                onSelect={onClickCard}
                                selectedKeys={state.selected}
                            />
                        ) : (
                            <ClientCard key={client.id} client={client} />
                        ),
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ListeClients;
