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
                    {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
                </div>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </section>
            {children}
        </>
    );
};

export default PageTemplate;
