import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { ENV } from "@/config/global";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = request.nextUrl;
        const version = searchParams.get("version");
        const date = new Date();

        const response = await fetch(ENV.NTFY_URL, {
            headers: {
                "content-type": "application/json",
                title: "Build Started",
                Priority: "3",
                Authorization: `Bearer ${ENV.NTFY_TOKEN}`,
                Cache: "no",
                "X-Template": `${ENV.NTFY_MESSAGE_TEMPLATE}`,
                actions: `view, Open ${ENV.APP_TITLE}, ${ENV.DOMAIN}`,
            },
            method: "POST",
            body: JSON.stringify({
                version: version,
                project: `${ENV.APP_TITLE}`,
                date: format(new Date(date), "dd/MM/yyyy HH:mm:ss"),
            }),
        });
        if (!response.ok) {
            const jsonBody = await response.json();
            return NextResponse.json(
                {
                    success: false,
                    message: jsonBody,
                },
                { status: response.status },
            );
        }
        return NextResponse.json({
            success: true,
            message: "success",
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: `An error is occur reason: ${error.message}`,
            });
        }
    }
};
