"use client";
import { useSession } from "next-auth/react";

const useGetGrade = () => {
    const { data } = useSession();
    return data?.user?.grade;
};

export default useGetGrade;
