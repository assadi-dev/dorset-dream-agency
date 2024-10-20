import React from "react";
import ClientCard from "./ClientCard";
import { ScrollArea } from "@/components/ui/scroll-area";

type ListeClientsProps = {
    clients: Array<any>;
};
const ListeClients = ({ clients }: ListeClientsProps) => {
    return (
        <ScrollArea className="h-[calc(85vh-220px)] rounded ">
            <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,350px)] justify-center gap-x-9 gap-y-9">
                {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default ListeClients;
