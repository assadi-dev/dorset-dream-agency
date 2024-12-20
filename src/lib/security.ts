"use server";

import { isAdmin } from "./utils";
import { redirect } from "next/navigation";
import { auth, UserSession } from "@/auth";

export const adminAccess = async () => {
    const session = (await auth()) as UserSession;
    if (!isAdmin(session?.user?.role || "user")) redirect("/");
};
