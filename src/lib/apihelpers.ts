import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { zodParserError } from "./parser";

export const zodJsonResponse = (zodError: unknown) => {
    if (zodError && zodError instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                path: zodParserError(zodError),
            },
            { status: 400 },
        );
    }
};
