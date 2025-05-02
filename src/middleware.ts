import { NextRequest } from "next/server";
import { authRedirect } from "./middlewares/authRedirect";
import { adminRedirect } from "./middlewares/adminRedirect";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    await authRedirect(request);
    await adminRedirect(request);
}

export const config = {
    matcher: [
        "/tableau-de-board",
        "/((?!api|_next/static|_next/image|video|image|application|favicon.ico|robot.ts|sitemap.xml|robot.txt).*)",
    ],
};
