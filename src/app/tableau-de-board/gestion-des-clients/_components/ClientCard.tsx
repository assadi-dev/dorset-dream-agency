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
            <figure className="w-full shadow rounded  bg-white h-[150px] relative grid">
                <Image
                    width={100}
                    height={100}
                    src={UNKNOWN_IMAGE}
                    alt={`photo of ${client.name}`}
                    className="w-[100px] rounded-l-lg absolute top-[50%] translate-y-[-50%] left-0  z-0 opacity-25"
                />

                <figcaption className=" text-sm text-center leading-6 w-full  lg:self-center z-10 lg:ml-8">
                    <p className="font-bold">{client.fullName}</p>
                    <p>{client.phone}</p>
                    <p>{client.createdAt}</p>
                </figcaption>
            </figure>
        </Link>
    );
};

export default ClientCard;
