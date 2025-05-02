import { isAdminRoutes } from "@/lib/nextUrl";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const adminRedirect = async (request: NextRequest) => {
    const adminRoutes = isAdminRoutes(request);
    // if (adminRoutes) notFound();
    return NextResponse.next();
};
