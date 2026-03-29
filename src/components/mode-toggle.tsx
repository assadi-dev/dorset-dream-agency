"use client"

import React from "react"
import { Moon, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const THEME_OPTIONS = [
    { value: "light", label: "Clair", icon: <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> },
    { value: "dark", label: "Sombre", icon: <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /> },
    { value: "system", label: "Système", icon: <Settings className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> },
]

type ModeToggleProps = {
    className?: string;
    variant?: "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | null | undefined;
}
export function ModeToggle({ className, variant = "outline" }: ModeToggleProps) {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size="icon" className={cn("rounded-full transition-all duration-300 ease-in-out", className)}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Mode du thème</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {THEME_OPTIONS.map((theme) => (
                    <DropdownMenuItem key={theme.value} onClick={() => setTheme(theme.value)} className="flex items-center gap-2 text-sm">
                        {theme.label}
                    </DropdownMenuItem>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
