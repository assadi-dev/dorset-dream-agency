"use client";
import { useSession } from "next-auth/react";

const useGetRoleUser = () => {
    const { data } = useSession();
    return data?.user?.role;
};

export default useGetRoleUser;
