import { LucideProps } from "lucide-react";

export type BackgroundImageApiResponse = {
    name: string;
    url: string;
};

export type TabsEditorType = {
    id: string;
    label: string;
    icon?: React.ReactElement;
    content?: React.ReactElement;
};
