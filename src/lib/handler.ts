import { ERROR_AUTH_MESSAGE, SERVER_ERROR } from "@/config/messages";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { zodParserError } from "./parser";

export const reportLogError = (error: Error) => {
    console.error(error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugLog = (message: any) => {
    console.log(message);
}




export const handleApiError = (error: unknown, message?: string) => {
    
    if (error instanceof ZodError) {
        reportLogError(error);
        return zodJsonResponse(error);
    }



    if (error instanceof Error) {
        reportLogError(error);
        return NextResponse.json(
            { error: message || error.message || SERVER_ERROR, code: 500 },
            { status: 500 }
        );
    }



};


export const zodJsonResponse = (zodError: unknown) => {
    if (zodError && zodError instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                fields: zodParserError(zodError),
            },
            { status: 400 },
        );
    }
};


