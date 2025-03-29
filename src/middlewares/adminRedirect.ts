import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import React from "react";

export const adminRedirect = () => {
    return NextResponse.next();
};
