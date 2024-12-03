import formatThousands from "format-thousands";

export const PriceRender = ({ value }: { value: any }) => {
    const formattedValue = formatThousands(value);
    return <p className="text-center">{formattedValue}$</p>;
};
export const CountRender = ({ value }: { value: any }) => {
    return <p className="text-center">{value}</p>;
};
