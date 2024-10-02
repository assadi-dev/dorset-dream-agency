import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import Image from "next/image";
import React from "react";

type VariantType = "male" | "female";
type AvatarProps = {
    src?: string;
    variant?: VariantType;
};
const AvatarClient = ({ src, variant }: AvatarProps) => {
    const UNKNOWN_IMAGE = variant === "female" ? AVATAR_FEMALE : AVATAR_MALE;
    return (
        <figure className="p-3 lg:pt-8">
            <Image
                placeholder="blur"
                src={UNKNOWN_IMAGE}
                alt={`picture of client ${variant}`}
                height={800}
                width={800}
                style={{ objectFit: "contain" }}
                className="rounded w-[80%]  mx-auto"
            />
            <figcaption className="mt-3 lg:mt-6">
                <p className="lg:text-4xl font-bold text-center text-white">John Doe</p>
            </figcaption>
        </figure>
    );
};

export default AvatarClient;
