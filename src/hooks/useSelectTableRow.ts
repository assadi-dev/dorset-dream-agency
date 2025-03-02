import React from "react";

const useSelectTableRow = () => {
    const [itemChecked, setItemChecked] = React.useState<any[]>([]);
    const handleSelectedRow = (row: Record<string, string>) => {
        if (!row) return;
        const id = row.id;
        const exist = itemChecked.find((item) => item.id === id);
        if (exist) {
            const index = itemChecked.indexOf(exist);
            itemChecked.splice(index, 1);
            setItemChecked([...itemChecked]);
        } else {
            setItemChecked([...itemChecked, row]);
        }
    };
    const handleSelectedAllRow = (rows: Record<string, string>[]) => {
        setItemChecked([...rows]);
    };

    return {
        itemChecked,
        handleSelectedRow,
        handleSelectedAllRow,
    };
};

export default useSelectTableRow;
