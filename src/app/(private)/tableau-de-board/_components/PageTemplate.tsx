import React from "react";
import GoBackButton from "./GoBackButton";

type PageTemplateProps = {
    title?: string;
    children?: React.ReactNode;
    description?: string;
    showPrevButton?: boolean;
};
const PageTemplate = ({ title, description, showPrevButton = true, children }: PageTemplateProps) => {
    return (
        <>
            <section>
                <div className="flex items-center gap-5 my-3 sm:my-1">
                    {showPrevButton && <GoBackButton />}
                    {title && (
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{title}</h1>
                    )}
                </div>
                {description && <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>}
            </section>
            {children}
        </>
    );
};

export default PageTemplate;
