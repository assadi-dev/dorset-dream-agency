import { GenderType } from "@/app/types";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { firstLetterCapitalize } from "@/lib/format";
import Image from "next/image";
import React from "react";

type AvatarProps = {
    src?: string;
    variant?: GenderType;
    fullName: string;
    lastName?: string;
    firstName?: string;
};
const AvatarClient = ({ src, variant, fullName, lastName, firstName }: AvatarProps) => {
    const UNKNOWN_IMAGE = variant === "Female" ? AVATAR_FEMALE : AVATAR_MALE;
    return (
        <figure className="p-3 lg:pt-8">
            <Image
                placeholder="blur"
                src={UNKNOWN_IMAGE}
                alt={`picture of client ${fullName || variant}`}
                height={800}
                width={800}
                style={{ objectFit: "contain" }}
                className="rounded w-[80%]  mx-auto"
            />
            <figcaption className="mt-3 lg:mt-6">
                <div className="w-fit mx-auto">
                    <p className="lg:text-2xl font-bold  text-white">{firstLetterCapitalize(lastName) || "??? ???"}</p>
                    <p className="lg:text-2xl font-bold  text-white">{firstLetterCapitalize(firstName) || "??? ???"}</p>
                </div>
            </figcaption>
        </figure>
    );
};

export default AvatarClient;
