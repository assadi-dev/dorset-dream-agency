"use client"

import { Button } from "@/components/ui/button"

type OpenNewTabButtonProps = {
    href?: string;
    label: string;
}

export const OpenNewTabButton = ({ href = process.env.NEXT_PUBLIC_PROCEDURES_URL, label }: OpenNewTabButtonProps) => {
    return (
        <Button asChild size={"sm"} className="text-sm absolute top-0 right-0 ">
            <a href={href} target="_blank">{label}</a>
        </Button>
    )
}