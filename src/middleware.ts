import { NextRequest } from "next/server";
import { authRedirect } from "./middlewares/authRedirect";

export async function middleware(request: NextRequest) {
    await authRedirect(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|video|image|application|favicon.ico|robot.ts|sitemap.xml|robot.txt).*)",
    ],
};
