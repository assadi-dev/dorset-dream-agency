import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClientType } from "../types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { datetimeFormatFr } from "@/lib/date";
import { Check, PhoneCall, Skull } from "lucide-react";
import CheckBoxCard from "./forms/CheckBoxCard";
import { cn } from "@/lib/utils";
import ClientCard from "./ClientCard";

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
        <CheckBoxCard id={`checkbox-${client.id}`} name="isDead" onChange={handleChecked}>
            <ClientCard client={client} selectedKeys={selectedKeys} disabled={true} />
        </CheckBoxCard>
    );
};

export default ClientCardSelect;
