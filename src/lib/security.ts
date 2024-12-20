"use server";

import { Role } from "@/app/types/user";
import { isAdmin } from "./utils";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const adminAccess = async () => {
    const session = await auth();
    if (!isAdmin(session?.user?.role || "user")) redirect("/");
};
