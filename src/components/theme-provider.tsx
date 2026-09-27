"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {


    const postMessageAllowed = () => {
        window.parent.postMessage({
            type: "setMouvementAllowed",
            data: true
        }, "*")
    }

    React.useLayoutEffect(() => {
        window.addEventListener("DOMContentLoaded", postMessageAllowed);
        return () => {
            window.removeEventListener("DOMContentLoaded", postMessageAllowed);
        }

    }, []);
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}