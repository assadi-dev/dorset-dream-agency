import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { datetimeFormatFr } from "@/lib/date";
import { PhoneCall, Skull } from "lucide-react";
import { cn } from "@/lib/utils";
import CheckBoxCard from "./forms/CheckBoxCard";

type ClientCardProps = {
    client: ClientType;
    selectedKeys: number[];
    disabled: boolean;
};
const ClientCard = ({ disabled, client }: ClientCardProps) => {
    const UNKNOWN_IMAGE = client.gender === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    const CLEAN_DATE = datetimeFormatFr(client.createdAt);

    return (
        <Link
            href={{ pathname: "gestion-des-clients/client", query: { id: client.id } }}
            className={cn({ "pointer-events-none": disabled })}
        >
            <Card className="relative">
                <figure className="grid grid-rows-[1fr,auto] gap-3 p-2 w-full h-full bg-gradient-to-br from-green-900 to-green-950 text-white rounded-lg shadow-inner shadow-white">
                    <div className="bg-green-950 backdrop-blur-lg rounded-lg shadow-inner shadow-white/50 relative overflow-hidden  h-[285px]">
                        <Image
                            height={400}
                            width={400}
                            src={UNKNOWN_IMAGE}
                            alt={`photo of ${client.fullName}`}
                            className={cn("object-cover object-center h-full", {
                                "brightness-75": client.isDead,
                            })}
                        />

                        {client.isDead && (
                            <div className="flex gap-1 justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold p-3 rounded-lg w-1/2  bg-red-600 shadow-xl z-50">
                                <Skull className="w-4" /> Décédé
                            </div>
                        )}
                    </div>
                    <figcaption className="flex-1 bg-green-950 shadow-inner shadow-white/65 backdrop-blur-lg py-2 px-3 rounded-lg h-fit self-end overflow-hidden">
                        <p className="text-sm lg:text-[1rem] font-bold max-w-[80%] text-nowrap text-ellipsis overflow-hidden mb-1 truncate max-w-3/4">
                            {client.fullName}
                        </p>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="flex items-center flex-nowrap gap-2 text-xs lg:text-sm text-primary-accent">
                                    <PhoneCall className="h-3 w-3" /> {client.phone}
                                </p>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </Card>
        </Link>
    );
};

export default ClientCard;
