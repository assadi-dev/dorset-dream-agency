import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import ClientCard from "./ClientCard";

const ClientCardNavigation = ({ client, selectedKeys }: { client: ClientType; selectedKeys: number[] }) => {
    return (
        <Link href={{ pathname: "gestion-des-clients/client", query: { id: client.id } }}>
            <ClientCard client={client} selectedKeys={selectedKeys} disabled={true} />
        </Link>
    );
};

export default ClientCardNavigation;
