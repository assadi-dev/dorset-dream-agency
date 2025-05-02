import { ENV } from "@/config/global";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const authRedirect = async (request: NextRequest) => {
    const cookie = cookies();
    const session_token = cookie.get("authjs.session-token")?.value;
    const LOGIN_PAGE = ENV.NEXT_AUTH_SIGN_IN_PAGE;

    if (!session_token) return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
    return NextResponse.next();
};
