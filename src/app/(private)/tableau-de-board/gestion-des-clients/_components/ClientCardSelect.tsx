import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { datetimeFormatFr } from "@/lib/date";
import { Check, Skull } from "lucide-react";
import CheckBoxCard from "./forms/CheckBoxCard";

const ClientCardSelect = ({
    client,
    onSelect,
    selectedKeys,
}: {
    client: ClientType;
    onSelect: (value: { id: number; checked: boolean }) => void;
    selectedKeys: number[];
}) => {
    const UNKNOWN_IMAGE = client.gender === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    const CLEAN_DATE = datetimeFormatFr(client.createdAt);
    const handleChecked = (e: any) => {
        const id = Number(e.target.id.split("-")[1]);
        const checked = e.target.checked;
        const result = {
            id,
            checked,
        };
        onSelect(result);
    };
    return (
        <Card className="rounded  bg-white hover:shadow-lg  transition-all relative">
            <CheckBoxCard id={`checkbox-${client.id}`} name="isDead" onChange={handleChecked}>
                <figure className="w-full h-[150px] relative grid">
                    <Image
                        width={100}
                        height={100}
                        src={UNKNOWN_IMAGE}
                        alt={`photo of ${client.fullName}`}
                        className="w-[100px] rounded-l-lg absolute top-[50%] translate-y-[-50%] left-1  z-0 opacity-25"
                    />

                    <figcaption className=" text-sm text-center leading-6 w-full  lg:self-center z-10 lg:ml-8">
                        <p className="font-bold">{client.fullName}</p>
                        <p>{client.phone}</p>
                        {/*   <p>{CLEAN_DATE}</p> */}
                        {client.isDead && (
                            <p className="font-semibold text-xs flex items-center gap-1 w-fit mx-auto text-slate-600 px-2 bg-slate-300 rounded">
                                <Skull className="w-3" />
                                {client.isDead ? "Décédé" : null}
                            </p>
                        )}
                    </figcaption>
                </figure>
            </CheckBoxCard>
        </Card>
    );
};

export default ClientCardSelect;
