"use client";
import React from "react";
import DOMPurify from "dompurify";

type DescriptionPropertyProps = {
    description?: string | null;
};
const DescriptionProperty = ({ description }: DescriptionPropertyProps) => {
    const cleanHTML = DOMPurify.sanitize(description ?? "<p></p>");

    return (
        <>
            <h2 className=" lg:text-2xl font-bold">Description</h2>
            <div
                className="ProseMirror text-slate-500 my-3 break-words text-sm text-justify sm:text-left whitespace-pre-line rich-text-style"
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
        </>
    );
};

export default DescriptionProperty;
