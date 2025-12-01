import { NextRequest } from "next/server";

export const isAdminRoutes = (request: NextRequest) => {
    return request.nextUrl.pathname.includes("administrations");
};
