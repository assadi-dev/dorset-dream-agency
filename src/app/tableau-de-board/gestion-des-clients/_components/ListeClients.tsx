import Link from "next/link";
import React from "react";
import ClientCard from "./ClientCard";
import { cleanClientMock } from "../clients-mock";
import { ScrollArea } from "@/components/ui/scroll-area";

const ListeClients = () => {
    return (
        <ScrollArea className="h-[calc(85vh-200px)] rounded ">
            <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,200px)] justify-between  gap-x-5 gap-y-5">
                {cleanClientMock.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default ListeClients;
