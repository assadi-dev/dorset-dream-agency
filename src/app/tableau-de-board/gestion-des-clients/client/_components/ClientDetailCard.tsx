import { Card } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import React from "react";
import AvatarClient from "./AvatarClient";
import { clientDetailType } from "../actions/actions";
import ActionDetailClient from "./ActionDetailClient";

type ClientDetailCardType = {
    client: clientDetailType;
};
const ClientDetailCard = async ({ client }: ClientDetailCardType) => {
    return (
        <Card className="bg-primary text-secondary lg:grid lg:grid-rows-[auto,1fr,auto] lg:gap-4">
            <AvatarClient
                variant={client.gender}
                fullName={client.fullName}
                lastName={client.lastName}
                firstName={client.firstName}
            />

            <ul className="p-3 text-muted-foreground w-100 lg:max-w-[80%] mt-2 justify-self-center">
                <li className="mb-3">
                    <p className="flex items-center ">{client?.address || "Address non renseigné"} </p>
                </li>
                <li className="mb-3">
                    <p className="flex items-center">
                        <PhoneCall className="text-muted-foreground h-3 w-3 mr-2" /> : {client?.phone || "N/A"}
                    </p>
                </li>
                {/*  <li>Décédé: NON</li> */}
                <li></li>
            </ul>
            <ActionDetailClient client={client} />
        </Card>
    );
};

export default ClientDetailCard;
