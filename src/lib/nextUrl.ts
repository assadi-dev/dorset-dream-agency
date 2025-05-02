import { NextRequest } from "next/server";

export const isAdminRoutes = (request: NextRequest) => {
    console.log(request.nextUrl.pathname);

    return request.nextUrl.pathname.includes("administrations");
};
