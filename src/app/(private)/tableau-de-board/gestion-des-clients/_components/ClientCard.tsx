import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { datetimeFormatFr } from "@/lib/date";
import { Skull } from "lucide-react";

const ClientCard = ({ client }: { client: ClientType }) => {
    const UNKNOWN_IMAGE = client.gender === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    const CLEAN_DATE = datetimeFormatFr(client.createdAt);
    return (
        <Link href={{ pathname: "gestion-des-clients/client", query: { id: client.id } }}>
            <Card className="rounded  bg-white hover:shadow-lg hover:scale-105 transition-all relative">
                <figure className="w-full h-[180px] relative grid">
                    <Image
                        width={100}
                        height={100}
                        src={UNKNOWN_IMAGE}
                        alt={`photo of ${client.fullName}`}
                        className="w-[100px] rounded-l-lg absolute top-[50%] translate-y-[-50%] left-1  z-0 opacity-15"
                    />

                    <figcaption className=" text-sm text-center leading-6 w-full  lg:self-center z-10 lg:ml-8 h-full flex flex-col items-center justify-center">
                        <p className="font-bold">{client.fullName}</p>
                        <p>{client.phone}</p>
                        {client.isDead && (
                            <p className="font-semibold text-xs flex items-center gap-1 w-fit mx-auto text-slate-600 px-2 bg-slate-300 rounded">
                                <Skull className="w-3" />
                                {client.isDead ? "Décédé" : null}
                            </p>
                        )}
                    </figcaption>
                </figure>
            </Card>
        </Link>
    );
};

export default ClientCard;
