import { GenderType } from "@/app/types";
import TextWithTooltip from "@/components/Text/TextWithTooltip";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { firstLetterCapitalize } from "@/lib/format";
import { PhoneCall, User, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { clientDetailType } from "../actions/actions";
import { cn } from "@/lib/utils";

type AvatarProps = {
    src?: string;
    variant?: GenderType;
    client: clientDetailType;
};
const AvatarClient = ({ variant, client }: AvatarProps) => {
    const UNKNOWN_IMAGE = variant === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    const ItemsKeyValue: { key: string; value: string; icon?: any }[] = [
        { key: "Nom", value: firstLetterCapitalize(client.lastName) || "??? ???", icon: User },
        { key: "Prénom", value: firstLetterCapitalize(client.firstName) || "??? ???", icon: User },
        { key: "Téléphone", value: client.phone || "??? ???", icon: PhoneCall },
    ];
    const fullName: string = `${client.firstName} ${client.lastName}`;
    const isDead = client.isDead ?? false;
    return (
        <figure className="p-3 lg:pt-8 text-black lg:text-primary-accent">
            <div className="relative w-1/2  lg:w-[80%]  mx-auto">
                <Image
                    placeholder="blur"
                    src={UNKNOWN_IMAGE}
                    alt={`picture of client ${fullName || variant}`}
                    height={400}
                    width={400}
                    style={{ objectFit: "contain" }}
                    className={cn("rounded w-full", {
                        "brightness-75": isDead,
                    })}
                />
                {isDead && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 min-w-28 text-center text-sm font-bold bg-red-600 shadow rounded text-white">
                        Décédé
                    </div>
                )}
            </div>
            <figcaption className="mt-3 lg:mt-6 p-3">
                <div className="w-full mx-auto overflow-x-hidden">
                    {ItemsKeyValue.map((item) => (
                        <div key={item.key} className=" flex justify-between items-center mb-1">
                            <span className="text-sm flex items-center gap-3">
                                {" "}
                                {item.icon && <item.icon className="w-4 h-4" />} {item.key}{" "}
                            </span>
                            <ShowTextWithTooltip content={item.value} />
                        </div>
                    ))}
                </div>
            </figcaption>
        </figure>
    );
};

export default AvatarClient;

const ShowTextWithTooltip = ({ content }: { content: string }) => {
    return (
        <TextWithTooltip tooltipTitle={content}>
            <span className="block font-bold truncate w-28 text-end text-sm">
                {" "}
                {firstLetterCapitalize(content) || "??? ???"}{" "}
            </span>
        </TextWithTooltip>
    );
};
