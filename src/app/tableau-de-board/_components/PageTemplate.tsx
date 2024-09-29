import React from "react";

type PageTemplateProps = {
    title?: string;
    children: React.ReactNode;
    description?: string;
};
const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
    return (
        <>
            <section>
                <h1 className="text-3xl font-bold tracking-tight">{title || "Page Title"}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </section>
            {children}
        </>
    );
};

export default PageTemplate;
