import { Card } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import React from "react";
import AvatarClient from "./AvatarClient";
import { clientDetailType } from "../actions/actions";
import ActionDetailClient from "./ActionDetailClient";
import { auth, UserSession } from "@/auth";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { Skull } from "lucide-react";

type ClientDetailCardType = {
    client?: clientDetailType | null;
};
const ClientDetailCard = async ({ client }: ClientDetailCardType) => {
    const session = (await auth()) as UserSession;
    const role = session?.user.role;

    return (
        <Card className="bg-transparent border-none shadow-none lg:border lg:shadow  lg:bg-primary text-primary-accent lg:grid lg:grid-rows-[auto,1fr,auto] lg:gap-4">
            {client && <AvatarClient variant={client.gender || "Male"} client={client} />}

            <ActionDetailClient
                client={client}
                canUpdate={true}
                canDelete={ACTIONS_CONTROL_PERMISSION.canAction(role)}
            />
        </Card>
    );
};

export default ClientDetailCard;
