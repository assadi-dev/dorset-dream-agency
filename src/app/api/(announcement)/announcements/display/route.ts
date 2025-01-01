import { ENV } from "@/config/global";
import { getPublishedAnnouncements } from "@/database/drizzle/repositories/announcements";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const result = await getPublishedAnnouncements();

        const URL = ENV.DOMAIN + "/api/announcements/creation/";
        const data =
            result.length > 0
                ? {
                      title: result[0].title,
                      url: URL + result[0].path,
                  }
                : null;

        return NextResponse.json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                {
                    status: 500,
                },
            );
        }
    }
};
