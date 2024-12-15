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
        <Card className="bg-primary text-secondary lg:grid lg:grid-rows-[auto,1fr,auto] lg:gap-4">
            {client && (
                <AvatarClient
                    variant={client.gender || "Male"}
                    lastName={client.lastName}
                    firstName={client.firstName}
                />
            )}

            <ul className="py-5 sm:py-8 px-5 text-muted-foreground w-full mt-2 justify-self-center">
                <li className="mb-3">
                    <p className="flex gap-1 items-center justify-between font-semibold">
                        <span className="flex items-center gap-1">
                            <PhoneCall className="text-muted-foreground h-4 w-4" /> Téléphone:
                        </span>
                        <span className="text-sm">{client?.phone || "N/A"}</span>
                    </p>
                    <p className="text-sm"> </p>
                </li>

                <li>
                    <p className="flex gap-1 items-center justify-between font-semibold">
                        <span className="flex items-center gap-1">
                            <Skull className="text-muted-foreground h-4 w-4" /> Décédé:
                        </span>
                        <span className="py-0.5 px-3  bg-green-600 rounded text-white text-xs">
                            {client?.isDead ? "Oui" : "Non"}
                        </span>
                    </p>
                    <p className="text-sm"> </p>
                </li>

                <li></li>
            </ul>
            <ActionDetailClient client={client} canUpdate={true} canDelete={ACTIONS_CONTROL_PERMISSION.isAdmin(role)} />
        </Card>
    );
};

export default ClientDetailCard;
