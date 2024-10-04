import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";

const ClientCard = ({ client }: { client: ClientType }) => {
    const UNKNOWN_IMAGE = client.gender === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    return (
        <Link href={{ pathname: "gestion-des-clients/detail", query: { client: client.slug } }}>
            <Card className="w-[200px] shadow-xl">
                <figure>
                    <Image src={UNKNOWN_IMAGE} alt={`photo of ${client.name}`} />
                    <figcaption className="bg-white p-3 text-center leading-8">
                        <p>{client.fullName}</p>
                        <p>{client.phone}</p>
                        <p>{client.createdAt}</p>
                    </figcaption>
                </figure>
            </Card>
        </Link>
    );
};

export default ClientCard;
