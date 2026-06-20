import React from "react";
import type { SVGProps } from "react";

export function RadixIconsFontSize(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.782 2.217a.4.4 0 0 0-.565 0l-2 2a.4.4 0 0 0 .565.566L2.1 3.466v8.068L.782 10.217a.4.4 0 0 0-.565.566l2 2a.4.4 0 0 0 .565 0l2-2a.4.4 0 0 0-.565-.566l-1.318 1.317V3.466l1.318 1.317a.4.4 0 0 0 .565-.566zm7.718.533a.5.5 0 0 1 .47.33l3 8.32a.5.5 0 0 1-.94.34l-.982-2.724H8.952l-.982 2.723a.5.5 0 0 1-.94-.34l3-8.319a.5.5 0 0 1 .47-.33m0 1.974l1.241 3.442H9.26z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export function TextLineHeight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
                <path
                    strokeLinejoin="round"
                    d="m2.75 18.345l1.992 2.037c.235.24.547.361.858.361m2.85-2.398l-1.992 2.037c-.235.24-.547.361-.858.361M2.75 5.61l2.002-2.002c.234-.234.54-.351.848-.351M8.45 5.61l-2-2.002a1.2 1.2 0 0 0-.849-.351m0 17.486V3.257"
                ></path>
                <path d="M11.55 4.25h9.7m-9.7 15.5h9.7"></path>
                <path
                    strokeLinejoin="round"
                    d="m13.12 15.594l1.171-2.752m0 0h4.219m-4.219 0l1.796-4.218a.335.335 0 0 1 .627 0l1.796 4.217m0 0l1.172 2.753"
                ></path>
            </g>
        </svg>
    );
}
