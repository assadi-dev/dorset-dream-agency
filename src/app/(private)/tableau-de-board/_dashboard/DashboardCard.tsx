import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>> | null;
    children: React.ReactNode;
};
const DashboardCard = ({ title, icon, children, ...props }: DashboardCardProps) => {
    const RenderIcon = icon || null;

    return (
        <Card {...props}>
            {title ? (
                <CardHeader className="flex flex-row items-center justify-between text-primary-accent">
                    <CardTitle className="text-sm font-medium drop-shadow-sm">{title}</CardTitle>
                    {icon && RenderIcon ? (
                        <div className="bg-green-950 rounded-full p-3 shadow-lg">
                            <RenderIcon />
                        </div>
                    ) : null}
                </CardHeader>
            ) : null}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default DashboardCard;
