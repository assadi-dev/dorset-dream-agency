"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PowerOff } from "lucide-react";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

type AvatarDropdownProps = {
    user: {
        name: string;
        email: string;
        image: string;
        role: string;
        grade: string;
    };
};
const AvatarDropdown = ({ user }: AvatarDropdownProps) => {
    const Picture = ({ gender }) => {
        let picture = AVATAR_FEMALE;
        if (gender === "Male") {
            picture = AVATAR_MALE;
        }

        const styles = {
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        };

        return (
            <Image
                className=" h-[2rem] w-[2rem] sm:h-[2.5rem] sm:w-[2.5rem] rounded-full  shadow-xl border border-slate-500"
                src={picture}
                width={80}
                height={80}
                priority
                alt={`avatar picture of user`}
            />
        );
    };

    const AvatarRow = ({ user }) => {
        return (
            <div className="flex gap-5 items-center px-1">
                <Picture gender={user.gender} />
                <div className="flex flex-col items-center">
                    <p className="mb-0 font-semibold">{user.name || ""}</p>
                    <p className="text-slate-800 text-xs bg-slate-100 py-1 px-5 rounded font-semibold border">
                        {user.grade || ""}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {" "}
                    <AvatarRow user={user} />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <LogoutButton />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default AvatarDropdown;
