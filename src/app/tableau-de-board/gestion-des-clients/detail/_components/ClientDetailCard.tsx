import { Card } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import React from "react";
import AvatarClient from "./AvatarClient";
import { Button } from "@/components/ui/button";

const ClientDetailCard = () => {
    return (
        <Card className="bg-primary text-secondary lg:grid lg:grid-rows-[auto,1fr,auto] lg:gap-4">
            <AvatarClient variant="Male" />

            <ul className="p-3 text-muted-foreground w-100 lg:max-w-[80%] mt-2 justify-self-center">
                <li className="mb-3">
                    <p className="flex items-center ">576 rue des marsouin paris 75015</p>
                </li>
                <li className="mb-3">
                    <p className="flex items-center">
                        <PhoneCall className="text-muted-foreground h-4 w-4 mr-2" /> : 555-7385
                    </p>
                </li>
                <li>Décédé: NON</li>
                <li></li>
            </ul>
            <div className="lg:grid lg:grid-rows-2 self-end mb-8 p-3 gap-3">
                <Button variant="outline" className="bg-primary">
                    Modifier
                </Button>
                <Button variant="destructive">Supprimer</Button>
            </div>
        </Card>
    );
};

export default ClientDetailCard;
