type variant = {
    id: number | string;
    name: string;
    files: [];
};

export const removeVariants = (variants: Array<variant>, ids: Array<string | number>) => {
    return [...variants].filter((v) => !ids.includes(v.id));
};
