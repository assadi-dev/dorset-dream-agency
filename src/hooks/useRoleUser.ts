"use client";
import { UserSession } from "@/auth";
import { useSession } from "next-auth/react";

const useGetRoleUser = () => {
    const { data } = useSession();
    const session = data as UserSession;
    return session.user.role;
};

export default useGetRoleUser;
