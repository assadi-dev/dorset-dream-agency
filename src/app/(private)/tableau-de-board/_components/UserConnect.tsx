"use client";

import { useSession } from "next-auth/react";
import React from "react";
/* import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar" */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AVATAR_FEMALE, AVATAR_MALE } from "@/config/image";
import { RoleEnum } from "@/app/types/user";

type User = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    grade?: string | null;
    gender?: "Male" | "Female";
};

type AvatarDropdownProps = {
    user?: User | null;
};
const AvatarDropdown = ({ user }: AvatarDropdownProps) => {
    type PictureProps = {
        gender: "Male" | "Female";
    };

    const Picture = ({ gender }: PictureProps) => {
        let picture = AVATAR_FEMALE;
        if (gender === "Male") {
            picture = AVATAR_MALE;
        }

        return (
            <Image
                className=" h-[2rem] w-[2rem] sm:h-[3.5rem] sm:w-[3.5rem] rounded  shadow-xl "
                src={user?.image || picture}
                width={80}
                height={80}
                priority
                alt={`avatar picture of user`}
            />
        );
    };

    type AvatarRowProps = {
        user?: User | null;
        role?: boolean;
    };
    const AvatarRow = ({ user, role }: AvatarRowProps) => {
        return (
            <>
                <Picture gender={user?.gender || "Male"} />
                <div className="relative grid flex-1 text-left text-sm leading-tight w-full max-w-[98%]">
                    <span className="truncate font-semibold  text-sm">{user?.name}</span>
                    <div className="flex justify-between items-center">
                        <span className="truncate text-xs ">{user?.grade}</span>{" "}
                        {role && user?.role === RoleEnum.admin && (
                            <span className="absolute right-1 bottom-1  text-[0.68rem] font-semibold text-black drop-shadow-xl s bg-green-400 rounded-lg px-2 py-1">
                                Admin
                            </span>
                        )}
                    </div>
                </div>
            </>
        );
    };

    return <AvatarRow user={user} role />;
};

//bg-[#0f172a]

const UserConnect = () => {
    const { isMobile } = useSidebar();
    const session = useSession();
    const user = session ? (session?.data?.user as User) : null;

    return (
        <SidebarMenu>
            <SidebarMenuItem className="rounded-lg border border-green-900 bg-gradient-to-r from-black  to-primary  transition-all shadow-lg">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground sm:min-h-[4rem] p-1.5"
                        >
                            <AvatarDropdown user={user} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-1 font-normal flex items-center w-full gap-3">
                            <AvatarDropdown user={user} />
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={"/tableau-de-board/account"} className=" w-full">
                                <DropdownMenuItem className="justify-start gap-3 w-full">
                                    <User /> <span>Mon Compte</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogoutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default UserConnect;
