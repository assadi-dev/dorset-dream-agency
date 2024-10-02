import Link from "next/link";
import React from "react";

const ListeClients = () => {
    return (
        <div>
            <Link href={{ pathname: "gestion-des-clients/detail", query: { client: "michel_howard" } }}>
                Michael Howard
            </Link>
        </div>
    );
};

export default ListeClients;
