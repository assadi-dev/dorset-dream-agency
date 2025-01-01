import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        const data = {
            title: "Announcement",
            url: "http://localhost:3000/api/announcements/creation/1735759275343.svg",
        };

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
